import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { MIN_DELAY, PROPOSER, EXECUTORS } from "./../hardhat-helper-config";

const deployTimeLock: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { getNamedAccounts, deployments, network } = hre;
  const { deployer } = await getNamedAccounts();
  const {deploy, log} = deployments;

  log("Deploying Time Lock Contract.....");

  const timeLock = await deploy("TimeLock", {
    from: deployer,
    args:[MIN_DELAY, PROPOSER, EXECUTORS],
    log: true
    }
  );

  log(`TimeLock Contract with deployed to ${timeLock.address}`);
}


export default deployTimeLock;
deployTimeLock.tags = ["all", "timeLock"];