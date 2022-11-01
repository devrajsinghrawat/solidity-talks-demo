import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { DigitalVault } from "../typechain-types/contracts/DigitalVault";
import { ethers } from "hardhat";


const deployDigitalVault: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { getNamedAccounts, deployments, network } = hre;
  const { deployer } = await getNamedAccounts();
  const {deploy, log, get} = deployments;

  log("Deploying Digital Vault Contract.....");

  const digitalVault = await deploy("DigitalVault", {
    from: deployer,
    args:[],
    log: true
    }
  );

  const digitalVaultContract = await ethers.getContractAt('DigitalVault', digitalVault.address);
  const timeLock = await get("TimeLock");

  const transferOwnershipTx = await digitalVaultContract.transferOwnership(timeLock.address);
  await transferOwnershipTx.wait(1);

  log("Ownership of DigitalVault Contract has been transferred to Time Lock .....");

}

export default deployDigitalVault;
deployDigitalVault.tags = ["all", "digitalVault"];