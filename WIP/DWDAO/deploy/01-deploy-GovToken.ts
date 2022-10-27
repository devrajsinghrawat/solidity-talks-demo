import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { GovernanceToken } from "./../typechain-types/contracts/GovernanceToken";
import { ethers } from "hardhat";

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
  await delegate(governanceToken.address, deployer);
}

export default deployGovernanceToken;
deployGovernanceToken.tags = ["all", "governanceToken"];

const delegate =  async (governanceTokenAddress: string, delegatedAccount: string) => {
  const gT: GovernanceToken = await ethers.getContractAt("GovernanceToken", governanceTokenAddress);
  const txResponse = await gT.delegate(delegatedAccount);
  await txResponse.wait(1);
  console.log(`Checkpoints: ${(await gT.numCheckpoints(delegatedAccount))}`);
}