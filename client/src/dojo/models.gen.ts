
// Generated by dojo-bindgen on Sat, 2 Nov 2024 20:03:51 +0000. Do not modify this file manually.
// Import the necessary types from the recs SDK
// generate again with `sozo build --typescript` 
import { defineComponent, Type as RecsType, type World } from "@dojoengine/recs";

export type ContractComponents = Awaited<ReturnType<typeof defineContractComponents>>;



// Type definition for `skeleton_smash::types::direction::Direction` enum
export type Direction = { type: 'None'; } | { type: 'North'; } | { type: 'East'; } | { type: 'South'; } | { type: 'West'; };

export const DirectionDefinition = {
    type: RecsType.String,
    value: RecsType.String
};
        
// Type definition for `dojo::model::layout::Layout` enum
export type Layout = { type: 'Fixed'; value: RecsType.NumberArray; } | { type: 'Struct'; value: RecsType.StringArray; } | { type: 'Tuple'; value: RecsType.StringArray; } | { type: 'Array'; value: RecsType.StringArray; } | { type: 'ByteArray'; } | { type: 'Enum'; value: RecsType.StringArray; };

export const LayoutDefinition = {
    type: RecsType.String,
    value: RecsType.String
};
        
// Type definition for `core::byte_array::ByteArray` struct
export interface ByteArray {
    data: String[];
    pending_word: BigInt;
    pending_word_len: Number;
    
}
export const ByteArrayDefinition = {
    data: RecsType.StringArray,
    pending_word: RecsType.BigInt,
    pending_word_len: RecsType.Number,
    
};

// Type definition for `dojo::model::layout::FieldLayout` struct
export interface FieldLayout {
    selector: BigInt;
    layout: Layout;
    
}
export const FieldLayoutDefinition = {
    selector: RecsType.BigInt,
    layout: LayoutDefinition,
    
};

// Type definition for `skeleton_smash::models::player::Movement` struct
export interface Movement {
    run_id: Number;
    direction: Direction;
    
}
export const MovementDefinition = {
    run_id: RecsType.Number,
    direction: DirectionDefinition,
    
};


// Type definition for `skeleton_smash::models::player::Player` struct
export interface Player {
    contract_address: BigInt;
    run_id: Number;
    run_history: Number[];
    
}
export const PlayerDefinition = {
    contract_address: RecsType.BigInt,
    run_id: RecsType.Number,
    run_history: RecsType.NumberArray,
    
};


// Type definition for `skeleton_smash::models::player::Position` struct
export interface Position {
    run_id: Number;
    pos: Number;
    
}
export const PositionDefinition = {
    run_id: RecsType.Number,
    pos: RecsType.Number,
    
};


// Type definition for `skeleton_smash::models::map::Room` struct
export interface Room {
    room_id: Number;
    map: BigInt;
    death_walls: BigInt;
    player_positions: BigInt;
    level: Number;
    run_ids: Number[];
    
}
export const RoomDefinition = {
    room_id: RecsType.Number,
    map: RecsType.BigInt,
    death_walls: RecsType.BigInt,
    player_positions: RecsType.BigInt,
    level: RecsType.Number,
    run_ids: RecsType.NumberArray,
    
};


// Type definition for `skeleton_smash::models::map::RoomList` struct
export interface RoomList {
    id: Number;
    room_max_id_for_level: Number[];
    
}
export const RoomListDefinition = {
    id: RecsType.Number,
    room_max_id_for_level: RecsType.NumberArray,
    
};


// Type definition for `skeleton_smash::models::player::Run` struct
export interface Run {
    run_id: Number;
    player: BigInt;
    room_id: Number;
    level: Number;
    move_count: Number;
    is_dead: Boolean;
    
}
export const RunDefinition = {
    run_id: RecsType.Number,
    player: RecsType.BigInt,
    room_id: RecsType.Number,
    level: RecsType.Number,
    move_count: RecsType.Number,
    is_dead: RecsType.Boolean,
    
};


export function defineContractComponents(world: World) {
    return {

        // Model definition for `skeleton_smash::models::player::Movement` model
        Movement: (() => {
            return defineComponent(
                world,
                {
                    run_id: RecsType.Number,
                    direction: RecsType.String,
                },
                {
                    metadata: {
                        namespace: "skeleton_smash",
                        name: "Movement",
                        types: ["u32", "Direction"],
                        customTypes: [],
                    },
                }
            );
        })(),

        // Model definition for `skeleton_smash::models::player::Player` model
        Player: (() => {
            return defineComponent(
                world,
                {
                    contract_address: RecsType.BigInt,
                    run_id: RecsType.Number,
                    run_history: RecsType.NumberArray,
                },
                {
                    metadata: {
                        namespace: "skeleton_smash",
                        name: "Player",
                        types: ["ContractAddress", "u32", "array"],
                        customTypes: [],
                    },
                }
            );
        })(),

        // Model definition for `skeleton_smash::models::player::Position` model
        Position: (() => {
            return defineComponent(
                world,
                {
                    run_id: RecsType.Number,
                    pos: RecsType.Number,
                },
                {
                    metadata: {
                        namespace: "skeleton_smash",
                        name: "Position",
                        types: ["u32", "u8"],
                        customTypes: [],
                    },
                }
            );
        })(),

        // Model definition for `skeleton_smash::models::map::Room` model
        Room: (() => {
            return defineComponent(
                world,
                {
                    room_id: RecsType.Number,
                    map: RecsType.BigInt,
                    death_walls: RecsType.BigInt,
                    player_positions: RecsType.BigInt,
                    level: RecsType.Number,
                    run_ids: RecsType.NumberArray,
                },
                {
                    metadata: {
                        namespace: "skeleton_smash",
                        name: "Room",
                        types: ["u32", "felt252", "felt252", "felt252", "u32", "array"],
                        customTypes: [],
                    },
                }
            );
        })(),

        // Model definition for `skeleton_smash::models::map::RoomList` model
        RoomList: (() => {
            return defineComponent(
                world,
                {
                    id: RecsType.Number,
                    room_max_id_for_level: RecsType.NumberArray,
                },
                {
                    metadata: {
                        namespace: "skeleton_smash",
                        name: "RoomList",
                        types: ["u32", "array"],
                        customTypes: [],
                    },
                }
            );
        })(),

        // Model definition for `skeleton_smash::models::player::Run` model
        Run: (() => {
            return defineComponent(
                world,
                {
                    run_id: RecsType.Number,
                    player: RecsType.BigInt,
                    room_id: RecsType.Number,
                    level: RecsType.Number,
                    move_count: RecsType.Number,
                    is_dead: RecsType.Boolean,
                },
                {
                    metadata: {
                        namespace: "skeleton_smash",
                        name: "Run",
                        types: ["u32", "ContractAddress", "u32", "u32", "u32", "bool"],
                        customTypes: [],
                    },
                }
            );
        })(),
    };
}
