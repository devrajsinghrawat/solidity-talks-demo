// A Human-Readable ABI; for interacting with the contract, we 
// must include any fragment we wish to use 
const abi = [     
  // Read-Only Functions     
  "function balanceOf(address owner) view returns (uint256)",     
  "function decimals() view returns (uint8)",     
  "function symbol() view returns (string)",      
  // Authenticated Functions    
  "function transfer(address to, uint amount) returns (bool)",      
  // Events    
  "event Transfer(address indexed from, address indexed to, uint amount)" 
]; 

// Get provider 
// A Web3Provider wraps a standard Web3 provider, which is what MetaMask injects as window.ethereum into each page 
const provider = new ethers.providers.Web3Provider(window.ethereum); 
// MetaMask requires requesting permission to connect users accounts 
await provider.send("eth_requestAccounts", []); 
// The MetaMask plugin also allows signing transactions to send ether and pay to change state within the blockchain. 
// For this, you need the account signer... 
const signer = provider.getSigner(); 

// This can be an address or an ENS name const 
const contractAddress = "0x764a06fDdcE6b8895b6E7F9ba2874711BF31edEa";  
// Read-Only; By connecting to a Provider, allows: 
// - Any constant function 
// - Querying Filters 
// - Populating Unsigned Transactions for non-constant methods 
// - Estimating Gas for non-constant (as an anonymous sender) 
// - Static Calling non-constant methods (as anonymous sender) 
const erc20 = new ethers.Contract(contractAddress, abi, provider); 

// Read-Write; By connecting to a Signer, allows: 
// - Everything from Read-Only (except as Signer, not anonymous) 
// - Sending transactions for non-constant functions 
const erc20_rw = new ethers.Contract(contractAddress, abi, signer);
