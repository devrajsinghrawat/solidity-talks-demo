import React from 'react';
import { ethers } from "ethers";
import logo from './logo.svg';
import ABI from "./abi.json";
import './App.css'; 
import type { MetaMaskInpageProvider } from "@metamask/providers"; 

export const useMetaMask = () => { const ethereum = global?.window?.ethereum; if (!ethereum || !ethereum.isMetaMask) return; return ethereum as unknown as MetaMaskInpageProvider;}; 
function App() { 
  async function callMethod() { 
    const contractAddr = '0x2fe348929abfe45270ab4b0951f220a540f19276'; 

// Get provider 
// A Web3Provider wraps a standard Web3 provider, which is what MetaMask injects as window.ethereum into each page 
const provider = new ethers.providers.Web3Provider(window.ethereum); 
// MetaMask requires requesting permission to connect users accounts 
await provider.send("eth_requestAccounts", []); 
// The MetaMask plugin also allows signing transactions to send ether and pay to change state within the blockchain. 
// For this, you need the account signer... 
const signer = provider.getSigner(); 
/** // Get contract instance 
 const contract = new ethers.Contract(contractAddr, ABI, signer); 
 const result = await contract.deposit({value: ethers.utils.parseEther('0.02')}); 
 console.log(result); 
 */ 
 
 // Get Interface 
 const iface = new ethers.utils.Interface(ABI); 
 // Get Function data 
 const data = iface.encodeFunctionData("deposit", []); 
 // Send 1 ether to an ens name. 
 const tx = signer.sendTransaction({ to: contractAddr, value: ethers.utils.parseEther("0.04"), data }); 
 const result = (await tx).wait(); 
} 
return ( <div className="App"> <header className="App-header"> <img src={logo} className="App-logo" alt="logo" /> 
<p> This is a working examle for Sending Matic to Mumbai network using Metamask and Etherjs </p> 
<p> This Example covers both the approaches </p> 
<p> - Direct method call </p> 
<p> - Low level contract call using sendTransaction </p> 

<button onClick={callMethod}> Deposit 0.012 Matic </button> 
</header> 
</div> );
} 



export default App;