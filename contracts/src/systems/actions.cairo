// define the interface
#[dojo::interface]
trait IActions {
    fn spawn(ref world: IWorldDispatcher, seed: felt252);
    fn initialize(ref world: IWorldDispatcher);
}

#[dojo::contract]
mod actions {
    use super::IActions;
    use starknet::{ContractAddress, get_caller_address};
    use skeleton_smash::models::player::{Player, Position, Vec2};
    use skeleton_smash::models::map::{RoomList, RoomListTrait, Room, RoomTrait};


    #[abi(embed_v0)]
    impl ActionsImpl of IActions<ContractState> {
        fn initialize(ref world: IWorldDispatcher) {
            let mut initial_room_ids = ArrayTrait::new();
            initial_room_ids.append(0);
            let room_list = RoomList { id: 0, room_max_id_for_level: initial_room_ids };
            let initial_room = RoomTrait::new(0, 12, 0);
            set!(world, (room_list, initial_room));
        }
        fn spawn(ref world: IWorldDispatcher, seed: felt252) {
            // Get the player's address.
            let contract_address = get_caller_address();
            // Retrieve the player's current position from the world.
            let player = get!(world, contract_address, (Player));
            
            assert(player.run_id == 0, 'Player already in a run');

            // Get the room list and current room
            let mut room_list = get!(world, 0, (RoomList));
            let room_id = *room_list.room_max_id_for_level[0];
            let mut room = get!(world, room_id, (Room));

            // If current room is full, create a new one
            if RoomTrait::is_full(ref room) {
                // Increment the room id for level 0
                let room_list = RoomListTrait::increment_max_room_id_for_level(ref room_list, 0);
                // Create new room with the new id
                let new_room_id = *room_list.room_max_id_for_level[0];
                let new_room = RoomTrait::new(new_room_id, seed, 0);
                
                // Set both the updated room list and new room
                set!(world, (room_list, new_room));
                room = new_room;
            }

            // TODO: Add player to room's player_ids
            // TODO: Create new run for player
            // TODO: Set player position in the room
        }
    }
}
