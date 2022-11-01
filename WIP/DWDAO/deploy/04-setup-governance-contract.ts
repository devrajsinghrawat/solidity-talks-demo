import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { ethers } from "hardhat";
import  * as args from "./../hardhat-helper-config";

// import * as gtABI from "./../artifacts/contracts/GovernanceToken.sol/GovernanceToken.json";
// import * as tlABI from "./../artifacts/contracts/Governance/TimeLock.sol/TimeLock.json";
// import * as vgABI from "./../artifacts/contracts/Governance/VaultGovernor.sol/VaultGovernor.json";

const setupGovernanceContract: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { getNamedAccounts, deployments, network } = hre;
  const { deployer } = await getNamedAccounts();
  const {deploy, log, get} = deployments;

  const governanceToken = await get("GovernanceToken");
  const timeLock = await get("TimeLock");
  const vaultGovernor = await get("VaultGovernor");

  const governanceTokenContract = await ethers.getContractAt("GovernanceToken", governanceToken.address);
  const timeLockContract = await ethers.getContractAt("TimeLock", timeLock.address);
  const vaultGovernorContract = await ethers.getContractAt("VaultGovernor", vaultGovernor.address);


  log("Setting up governance roles...");

  const proposerRole = await timeLockContract.PROPOSER_ROLE();
  const executorRole = await timeLockContract.EXECUTOR_ROLE();
  const adminRole = await timeLockContract.TIMELOCK_ADMIN_ROLE();
//   const cancellerRole = await timeLockContract.CANCELLER_ROLE();

  // Proposer role has been granted to vault governor
  log("TimeLock Contract's Proposer roles granted to Vault Governor Contract...");
  const proposerTx = await timeLockContract.grantRole(proposerRole, vaultGovernorContract.address);
  proposerTx.wait(1);

  log("TimeLock Contract's Executor roles granted to No One (Address (0))...");
  const executorTx = await timeLockContract.grantRole(executorRole, args.ADDRESS_ZERO);
  executorTx.wait(1);

  log("TimeLock Contract's Admin roles has been revoked from Deployer ..");
  const revokeTx = await timeLockContract.revokeRole(adminRole, deployer);
  revokeTx.wait(1);

  log("Set up the governance contract for time Lock and Deployer is no Longer admin for TimeLock Contract");
}

export default setupGovernanceContract;
setupGovernanceContract.tags = ["all", "setupGovernanceContract"]