
// Generated by dojo-bindgen on Fri, 1 Nov 2024 22:26:34 +0000. Do not modify this file manually.
// Import the necessary types from the recs SDK
// generate again with `sozo build --typescript` 
import { Account, byteArray } from "starknet";
import { DojoProvider } from "@dojoengine/core";
import * as models from "./models.gen";

export type IWorld = Awaited<ReturnType<typeof setupWorld>>;

export async function setupWorld(provider: DojoProvider) {
    // System definitions for `skeleton_smash-actions` contract
    function actions() {
        const contract_name = "actions";

        
        // Call the `spawn` system with the specified Account and calldata
        const spawn = async (props: { account: Account, seed: bigint }) => {
            try {
                return await provider.execute(
                    props.account,
                    {
                        contractName: contract_name,
                        entrypoint: "spawn",
                        calldata: [props.seed],
                    },
                    "skeleton_smash"
                );
            } catch (error) {
                console.error("Error executing spawn:", error);
                throw error;
            }
        };
            

    
        // Call the `initialize` system with the specified Account and calldata
        const initialize = async (props: { account: Account }) => {
            try {
                return await provider.execute(
                    props.account,
                    {
                        contractName: contract_name,
                        entrypoint: "initialize",
                        calldata: [],
                    },
                    "skeleton_smash"
                );
            } catch (error) {
                console.error("Error executing initialize:", error);
                throw error;
            }
        };
            

    
        // Call the `move` system with the specified Account and calldata
        const move = async (props: { account: Account, direction: models.Direction, seed: bigint }) => {
            try {
                return await provider.execute(
                    props.account,
                    {
                        contractName: contract_name,
                        entrypoint: "move",
                        calldata: [["None", "North", "East", "South", "West"].indexOf(props.direction.type),
                props.seed],
                    },
                    "skeleton_smash"
                );
            } catch (error) {
                console.error("Error executing move:", error);
                throw error;
            }
        };

    
        // Call the `first_move` system with the specified Account and calldata
        const first_move = async (props: { account: Account, chosen_column: number, seed: bigint }) => {
            try {
                return await provider.execute(
                    props.account,
                    {
                        contractName: contract_name,
                        entrypoint: "first_move",
                        calldata: [props.chosen_column,
                props.seed],
                    },
                    "skeleton_smash"
                );
            } catch (error) {
                console.error("Error executing first_move:", error);
                throw error;
            }
        };
            

    
        // Call the `world` system with the specified Account and calldata
        const world = async (props: { account: Account }) => {
            try {
                return await provider.execute(
                    props.account,
                    {
                        contractName: contract_name,
                        entrypoint: "world",
                        calldata: [],
                    },
                    "skeleton_smash"
                );
            } catch (error) {
                console.error("Error executing world:", error);
                throw error;
            }
        };
            

        return {
            spawn, initialize, move, first_move, world
        };
    }

    return {
        actions: actions()
    };
}
