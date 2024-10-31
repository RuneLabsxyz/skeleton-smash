use skeleton_smash::types::direction::Direction;

#[dojo::interface]
trait IActions {
    fn spawn(ref world: IWorldDispatcher, seed: felt252);
    fn initialize(ref world: IWorldDispatcher);
    fn move_player(ref world: IWorldDispatcher, direction: Direction);
    fn first_move(ref world: IWorldDispatcher, direction: Direction, chosen_column: u8);
}

#[dojo::contract]
mod actions {
    use super::IActions;
    use starknet::{ContractAddress, get_caller_address};
    use skeleton_smash::models::player::{Player, Run, RunTrait, Position, PlayerTrait};
    use skeleton_smash::models::map::{RoomList, RoomListTrait, Room, RoomTrait};
    use skeleton_smash::helpers::move::{move_player};
    use skeleton_smash::types::direction::Direction;
    use skeleton_smash::helpers::bitmap::{set_player_bitmap, clear_player_bitmap};


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
            let mut player = get!(world, contract_address, (Player));
            
            assert(player.run_id == 0, 'Player already in a run');

            // Get the room list and current room
            let mut room_list = get!(world, 0, (RoomList));
            let mut room_id = *room_list.room_max_id_for_level[0];
            let mut room = get!(world, room_id, (Room));

            // If current room is full, create a new one
            if RoomTrait::is_full(ref room) {
                // Increment the room id for level 0
                room_list = RoomListTrait::increment_max_room_id_for_level(ref room_list, 0);
                // Create new room with the new id
                room_id = *room_list.room_max_id_for_level[0];
                room = RoomTrait::new(room_id, seed, 0);
                
                // Set both the updated room list and new room
            }

            // TODO: Set player position in the room

            room = RoomTrait::add_player(ref room, contract_address);
            let run_id = world.uuid();
            let run = RunTrait::new(run_id, contract_address, 0);
        
            player = PlayerTrait::set_run_id(ref player, run_id);


            set!(world, (room_list, room, run, player));
        }
        fn move_player(ref world: IWorldDispatcher, direction: Direction) {
            let contract_address = get_caller_address();
            let player = get!(world, contract_address, (Player));
            let mut room = get!(world, player.run_id, (Room));
            let mut position = get!(world, player.run_id, (Position));
            let mut run = get!(world, player.run_id, (Run));

            assert(position.pos != 0, 'Invalid position');

            //update player bitmap and move player
            room.player_positions = clear_player_bitmap(room.player_positions, position.pos);
            position.pos = move_player(direction, room.map, room.player_positions, position.pos);
            room.player_positions = set_player_bitmap(room.player_positions, position.pos);

            run.move_count += 1;

            set!(world, (position, run, room));
        }

        fn first_move(ref world: IWorldDispatcher, direction: Direction, chosen_column: u8) {
            let contract_address = get_caller_address();
            let mut player = get!(world, contract_address, (Player));
            let mut room = get!(world, player.run_id, (Room));
            let mut position = get!(world, player.run_id, (Position));

            assert(position.pos == 0, 'Invalid position');

            
        }
    }
}
