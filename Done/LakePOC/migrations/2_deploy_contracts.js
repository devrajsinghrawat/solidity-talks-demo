// Get an instance of the contract 
var CustomToken = artifacts.require("./CustomToken.sol");
var ChannelManager = artifacts.require("./ChannelManager.sol");

const account = '0xb51ff63e054275b8c9589ed7bd2aa9d2bbb7afb8';

module.exports = function (deployer) {
  deployer.deploy(CustomToken);
  deployer.deploy(ChannelManager, account);
};