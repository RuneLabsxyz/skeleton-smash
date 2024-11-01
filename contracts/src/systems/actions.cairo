use skeleton_smash::types::direction::Direction;
use skeleton_smash::consts::{WIDTH, HEIGHT};

#[dojo::interface]
trait IActions {
    fn spawn(ref world: IWorldDispatcher, seed: felt252);
    fn initialize(ref world: IWorldDispatcher);
    fn move_player(ref world: IWorldDispatcher, direction: Direction, seed: felt252);
    fn first_move(ref world: IWorldDispatcher, chosen_column: u8, seed: felt252);
}

#[dojo::contract]
mod actions {
    use super::IActions;
    use starknet::{ContractAddress, get_caller_address};
    use skeleton_smash::models::player::{Player, Run, RunTrait, Position, PlayerTrait};
    use skeleton_smash::models::map::{RoomList, RoomListTrait, Room, RoomTrait};
    use skeleton_smash::helpers::move::{move_player, check_obstacle, check_out_of_bounds};
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
            }

            room = RoomTrait::add_player(ref room, contract_address);
            let run_id = world.uuid();
            let run = RunTrait::new(run_id, contract_address, 0, room.room_id);

            player = PlayerTrait::set_run_id(ref player, run_id);

            set!(world, (room_list, room, run, player));
        }

        fn move_player(ref world: IWorldDispatcher, direction: Direction, seed: felt252) {
            let contract_address = get_caller_address();
            let mut player = get!(world, contract_address, (Player));
            let mut room = get!(world, player.run_id, (Room));
            let mut position = get!(world, player.run_id, (Position));
            let mut run = get!(world, player.run_id, (Run));

            assert(position.pos != 0, 'Invalid position');

            //update player bitmap and move player
            room.player_positions = clear_player_bitmap(room.player_positions, position.pos);
            let (new_position, is_exit) = move_player(
                direction, room.map, room.player_positions, position.pos
            );

            if is_exit {
                // Get the room list and current room
                let new_level = run.level + 1;
                let mut room_list = get!(world, 0, (RoomList));
                let mut room_id = *room_list.room_max_id_for_level[new_level];
                let mut room = get!(world, room_id, (Room));
                position.pos = 0;

                // If current room is full, create a new one
                if RoomTrait::is_full(ref room) {
                    // Increment the room id for level 0
                    room_list = RoomListTrait::increment_max_room_id_for_level(ref room_list, 0);
                    // Create new room with the new id
                    room_id = *room_list.room_max_id_for_level[new_level];
                    room = RoomTrait::new(room_id, seed, new_level);
                }
                room = RoomTrait::add_player(ref room, contract_address);
                run.level = new_level;
                run.move_count = 0;
                run.room_id = room_id;
                player = PlayerTrait::set_run_id(ref player, run.run_id);
            } else {
                // Update position and player bitmap
                position.pos = new_position;
                room.player_positions = set_player_bitmap(room.player_positions, position.pos);
                // Increment move count
                run.move_count += 1;
            }

            set!(world, (position, run, room));
        }

        /// First move of the run
        /// # Arguments
        /// * `chosen_column` - The column to move to (0-13)
        fn first_move(ref world: IWorldDispatcher, chosen_column: u8, seed: felt252) {
            let contract_address = get_caller_address();
            let mut player = get!(world, contract_address, (Player));
            let mut room = get!(world, player.run_id, (Room));
            let mut position = get!(world, player.run_id, (Position));
            let mut run = get!(world, player.run_id, (Run));

            assert(position.pos == 0, 'Invalid position');

            assert(!check_obstacle(room.map, WIDTH, HEIGHT, position.pos), 'Wall in the way');
            assert(
                !check_obstacle(room.player_positions, WIDTH, HEIGHT, position.pos), 'Player in the way'
            );

            // Move has to be North
            let (new_position, is_exit) = move_player(
                Direction::North, room.map, room.player_positions, position.pos
            );

            if is_exit {
                // Get the room list and current room
                let new_level = run.level + 1;
                let mut room_list = get!(world, 0, (RoomList));
                let mut room_id = *room_list.room_max_id_for_level[new_level];
                let mut room = get!(world, room_id, (Room));
                position.pos = 0;

                // If current room is full, create a new one
                if RoomTrait::is_full(ref room) {
                    // Increment the room id for level 0
                    room_list = RoomListTrait::increment_max_room_id_for_level(ref room_list, 0);
                    // Create new room with the new id
                    room_id = *room_list.room_max_id_for_level[new_level];
                    room = RoomTrait::new(room_id, seed, new_level);
                }
                room = RoomTrait::add_player(ref room, contract_address);
                run.level = new_level;
                run.move_count = 0;
                run.room_id = room_id;
                player = PlayerTrait::set_run_id(ref player, run.run_id);
            } else {
                // Update position and player bitmap
                position.pos = new_position;
                room.player_positions = set_player_bitmap(room.player_positions, position.pos);
                // Increment move count
                run.move_count += 1;
            }

            set!(world, (position, run, room, player));
        }
    }
}
