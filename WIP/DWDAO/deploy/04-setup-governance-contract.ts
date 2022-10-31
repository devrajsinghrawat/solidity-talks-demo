import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { ethers } from "hardhat";
import * as gtABI from "./../artifacts/contracts/GovernanceToken.sol/GovernanceToken.json";
import * as tlABI from "./../artifacts/contracts/Governance/TimeLock.sol/TimeLock.json";
import * as vgABI from "./../artifacts/contracts/Governance/VaultGovernor.sol/VaultGovernor.json";

const setupGovernanceContract: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { getNamedAccounts, deployments, network } = hre;
  const { deployer } = await getNamedAccounts();
  const {deploy, log, get} = deployments;

  const governanceToken = await get("GovernanceToken");
  const timeLock = await get("TimeLock");
  const vaultGovernor = await get("VaultGovernor");

  console.log('gtABI.abi ..', gtABI.abi);
  console.log('tlABI.abi ..', tlABI.abi);

  const governanceTokenContract = await ethers.getContractAt(gtABI.abi, governanceToken.address);
  const timeLockContract = await ethers.getContractAt(tlABI.abi, timeLock.address);
  const vaultGovernorContract = await ethers.getContractAt(vgABI.abi, vaultGovernor.address);


  log("Setting up governance roles...");

  const proposerRole = await timeLockContract.DEFAULT_ADMIN_ROLE

  // const setupGovernanceContract = await deploy("GovernanceToken", {
  //   from: deployer,
  //   args:[],
  //   log: true
  //   }
  // );

  log(`GT Contract with deployed to ${governanceToken.address}`);
}

export default setupGovernanceContract;
setupGovernanceContract.tags = ["all", "governanceToken"]