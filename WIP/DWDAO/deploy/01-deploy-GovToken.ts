import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const deployGovernanceToken: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { getNamedAccounts, deployments, network } = hre;
  const { deployer } = await getNamedAccounts();
  const {deploy, log} = deployments;

  log("Deploying governance token.....");

  const governanceToken = await deploy("GovernanceToken", {
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

export default deployGovernanceToken;
deployGovernanceToken.tags = ["all", "governanceToken"]