var myContract = artifacts.require("Minting");

module.exports = function (deployer) {
  deployer.deploy(myContract);
};
