const { ethers } = require('ethers');
const contractBuild = require('./truffle/build/contracts/FPNFT.json');
const contractAddress = '0xF72770ad1B99603D772c2Ead5c12CB4514a8772D';
const provider = new ethers.providers.Web3Provider(window.ethereum);

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
    try {
        const totalCost = mintAmount * 0.005;
        console.log(totalCost);
        await FPNFTcontract.functions.publicSaleMint(mintAmount, {from: selectedAccount, value: ethers.utils.parseEther(`${totalCost}`)}); 
    } catch(e) {
        return e;
    }
  
}

const getTokensOfAccount = async () => {
    let tokens = [];

    const nfts = await FPNFTcontract.functions.tokensOfOwner(selectedAccount, 1, 50);

    for(let x = 0; x<nfts[0].length; x++) {
        const nft = ethers.utils.formatUnits(nfts[0][x]._hex.toString(), 0)
        tokens.push(nft);
    }

    console.log(tokens);
    return tokens;
}

const balanceOf = async () => {
    const balance = await FPNFTcontract.functions.balanceOf(selectedAccount);
    return ethers.utils.formatUnits(balance[0]._hex.toString(), 0);
}

const getTotalSupply = async () => {
    const totalSupply = await FPNFTcontract.functions.currentSupply();
    console.log(ethers.utils.formatUnits(totalSupply[0]._hex.toString(), 0))
    return ethers.utils.formatUnits(totalSupply[0]._hex.toString(), 0);
}


module.exports = { initialize, mint, getTokensOfAccount, getTotalSupply, balanceOf}