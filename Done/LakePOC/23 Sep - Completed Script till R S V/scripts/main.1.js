var Web3 = require('web3');
var web3 = new Web3();

/** Listen for load */

window.addEventListener('load', () => {

  // check is web3 has already been injected 
  if (typeof web3 !== 'undefined') {
    window.web3 = new Web3(web3.currentProvider); // window.web3
  } else {
    // set the provider
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545")); // window.web3
  }

});

function stratApp() {
  if (web3 && web3.isConnected()) {
    setData('contect_status', 'Connected', false);

    // Get the version data and populate on UI
    setWeb3Version();
  } else {
    setData('contect_status', 'Not-Connected', false);
  }

  doGetNodeStatus();
  doGetCompilers();

}
