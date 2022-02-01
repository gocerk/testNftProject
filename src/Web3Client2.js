const { ethers } = require('ethers');
const contractBuild = require('./truffle/build/contracts/FPNFT.json');
// const convert = require('amrhextotext');

const contractAddress = '0xF72770ad1B99603D772c2Ead5c12CB4514a8772D';
const provider = new ethers.providers.Web3Provider(window.ethereum);

// let signer;
let FPNFTcontract;
let selectedAccount;

const initialize = async () => {
    if(typeof provider !== 'undefined') {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        selectedAccount = accounts[0];

        const signer = provider.getSigner();
        FPNFTcontract = new ethers.Contract(contractAddress, contractBuild.abi, signer);
        FPNFTcontract.connect(signer);

        console.log(selectedAccount);
    } else {
        console.log('Metamask is not installed!');
    }
}


const mint = async (mintAmount) => {
    const totalCost = mintAmount * 0.005;
    console.log(totalCost);
    await FPNFTcontract.functions.publicSaleMint(mintAmount, {from: selectedAccount, value: ethers.utils.parseEther(`${totalCost}`)}); 
}

const getTokensOfAccount = async () => {
    const tokens = await FPNFTcontract.functions.tokensOfOwner(selectedAccount, 1, 20); 
    console.log(tokens);
    return tokens;
}

const balanceOf = async () => {
    const balance = await FPNFTcontract.functions.balanceOf(selectedAccount);
    return balance;
}

const getTotalSupply = async () => {
    const totalSupply = await FPNFTcontract.functions.currentSupply();
    console.log(ethers.utils.formatUnits(totalSupply[0]._hex.toString(), 0))
    return totalSupply;
}


module.exports = { initialize, mint, getTokensOfAccount, getTotalSupply, balanceOf}