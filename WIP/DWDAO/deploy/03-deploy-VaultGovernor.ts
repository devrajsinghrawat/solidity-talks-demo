import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const deployVaultGovernor: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { getNamedAccounts, deployments, network } = hre;
  const { deployer } = await getNamedAccounts();
  const {deploy, log, get} = deployments;

  const governanceToken = await get("GovernanceToken");
  const timeLock = await get("TimeLock");

  log("Deploying VaultGovernor Contract.....");

  const vaultGovernor = await deploy("VaultGovernor", {
    from: deployer,
    args:[],
    log: true
    }
  );

  log(`Governor Contract with deployed to ${vaultGovernor.address}`);
}

export default deployVaultGovernor;
deployVaultGovernor.tags = ["all", "vaultGovernor"]