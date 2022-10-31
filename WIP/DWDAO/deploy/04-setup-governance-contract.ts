import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { ethers } from "hardhat";

const setupGovernanceContract: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { getNamedAccounts, deployments, network } = hre;
  const { deployer } = await getNamedAccounts();
  const {deploy, log, get} = deployments;

  const governanceToken = await ethers.getContractFactory("GovernanceToken", deployer);
  const timeLock = await ethers.getContractFactory("TimeLock", deployer);
  const vaultGovernor = await get("VaultGovernor");


  log("Setting up governance roles.....");

  await timeLock

  const setupGovernanceContract = await deploy("GovernanceToken", {
    from: deployer,
    args:[],
    log: true
    }
  );

  log(`GT Contract with deployed to ${governanceToken.address}`);

  // const GovernanceTokenFactory = await ethers.getContractFactory("GovernanceToken");
  // const GT = await GovernanceTokenFactory.deploy();

  // await GT.deployed();

  // console.log(`GT Contract with deployed to ${GT.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });

export default setupGovernanceContract;
setupGovernanceContract.tags = ["all", "governanceToken"]