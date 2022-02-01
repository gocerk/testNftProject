const Web3 = require('web3');
const Web3EthContract = require('web3-eth-contract');
const convert = require('amrhextotext')

const web3 = new Web3(window.ethereum);
Web3EthContract.setProvider(window.ethereum);

const contractBuild = require('./truffle/build/contracts/FPNFT.json');

const contractAddress = '0xF72770ad1B99603D772c2Ead5c12CB4514a8772D';

let selectedAccount;
let FPNFTcontract;

let provider = window.ethereum;

const initialize = async () => {
    if (typeof provider !== 'undefined') {
        const accounts = await provider.request({method: 'eth_requestAccounts'});
        selectedAccount = accounts[0];
        FPNFTcontract = new Web3EthContract(contractBuild.abi, contractAddress);
    } else {
        console.log('Metamask is not installed!');
    }

    console.log(selectedAccount);
}

const onActions = () => {
    window.ethereum.on('accountsChanged', function (accounts) {
        selectedAccount = accounts[0];
    });    

    window.ethereum.on('networkChanges', function() {
       console.log('Network changed!, please reload the page');
    });
}

const getPayload = (from, to, nonce, gas, gasPrice, data) => {
    return { 
        from: from,
        to: to,
        nonce: nonce.toString(),
        gas: '0x76c0',
        gasPrice: '0x9184e72a000',
        data: data,
        value: `0x${convert.textToHex(data)}`
    }
}

const getMintPrice = async () => {
    const mintPrice = await FPNFTcontract.methods.MINT_PRICE().call({from: selectedAccount});
    
    return mintPrice;
}


const mint = async () => {
    try {
        const nonce = await web3.eth.getTransactionCount(selectedAccount, 'latest');
        const data = await FPNFTcontract.methods.publicSaleMint(1).encodeABI();
        const mintPrice = await getMintPrice();        

        const payload = getPayload(selectedAccount, contractAddress, nonce, 30400, 10000000000000, data, mintPrice);
        console.log(payload);
        const signedTx = await provider.request({method: 'eth_sendTransaction', params: [payload]});
        
        console.log(signedTx);

        const transactionReceipt = await web3.eth.sendSignedTransaction(`0x${signedTx.toString(16)}`);
        console.log(transactionReceipt);
    } catch(e) {
        console.log(e);
    }
}

const getTokensOfAccount = async () => {
    const tokens = await FPNFTcontract.methods.tokensOfOwner(selectedAccount, 1, 50).call({from: selectedAccount});
    console.log(tokens);
    return tokens;
}

const getTotalSupply = async () => {
    const totalSupply = await FPNFTcontract.methods.currentSupply().call({from: selectedAccount});
    
    return totalSupply;
}

module.exports = { initialize, mint, getTokensOfAccount, getTotalSupply, onActions};