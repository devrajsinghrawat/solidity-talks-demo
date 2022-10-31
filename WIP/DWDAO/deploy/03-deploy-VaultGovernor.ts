import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import  * as args from "./../hardhat-helper-config";

const deployVaultGovernor: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { getNamedAccounts, deployments, network } = hre;
  const { deployer } = await getNamedAccounts();
  const {deploy, log, get} = deployments;

  const governanceToken = await get("GovernanceToken");
  const timeLock = await get("TimeLock");

  log("Deploying VaultGovernor Contract.....");

  const vaultGovernor = await deploy("VaultGovernor", {
    from: deployer,
    args:[
        governanceToken.address,
        timeLock.address,
        args.VOTING_DELAY,
        args.VOTING_PERIOD,
        args.QUORUM_PERCENT
        ],
    log: true
    }
  );

  log(`Governor Contract with deployed to ${vaultGovernor.address}`);
}

export default deployVaultGovernor;
deployVaultGovernor.tags = ["all", "vaultGovernor"]