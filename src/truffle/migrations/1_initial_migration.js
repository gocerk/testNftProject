const FPNFT = artifacts.require("./FPNFT.sol");

module.exports = function (deployer) {
  deployer.deploy(FPNFT, "FPNFT", "FPNFT", "BASEURI");
};