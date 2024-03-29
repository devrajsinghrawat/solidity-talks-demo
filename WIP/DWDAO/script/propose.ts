/**
 * This script will simulate the proposal 
 * */
import * as hre from "hardhat";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DESCRIPTION, DEVELOPMENT_CHAINS, FUNC, FUNC_ARGS, PROPOSER, VOTING_DELAY } from "../hardhat-helper-config";
import { ethers } from "hardhat";
import { moveBlocks } from "../utils";
import * as fs from "fs";

const makeProposal = async (
    funcToCall: string, 
    args: number[], 
    proposalDescription: string,
    _hre: HardhatRuntimeEnvironment
    ) => {
        const { getNamedAccounts, deployments, network } = _hre;
        const { deployer } = await getNamedAccounts();
        const {deploy, log, get} = deployments;

        const vaultGovernor = await get("VaultGovernor");
        // const VaultGovernor = await ethers.getContractFactory("VaultGovernor");
        const vaultGovernorContract = await ethers.getContractAt("VaultGovernor", vaultGovernor.address);

        const digitalVault = await get("DigitalVault");
        const digitalVaultContract = await ethers.getContractAt("DigitalVault", digitalVault.address);

        const encodeFunctionCall = digitalVaultContract.interface.encodeFunctionData(funcToCall, args);

        const proposeTx = await vaultGovernorContract.propose(
            [digitalVaultContract.address], 
            [0], 
            [encodeFunctionCall], 
            proposalDescription
        );

        const proposalReciept = proposeTx.wait(1);

        if (DEVELOPMENT_CHAINS.includes(network.name)) {
            // Jump voting Delay
            await moveBlocks(VOTING_DELAY + 1); 
        }

        const proposalId = (await proposalReciept).events[0].args.proposalId;

        console.log("proposalId....", proposalId.toString());

        fs.writeFileSync(
            PROPOSAL_FILE,
            JSON.stringify({
                [network.config.chainId!.toString()]: [proposalId.toString()],
            })
            )


    }
    
    makeProposal(FUNC, [FUNC_ARGS], DESCRIPTION, hre)
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });