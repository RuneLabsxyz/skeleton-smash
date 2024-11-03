use starknet::ContractAddress;
use origami_map::map::{MapTrait};
use skeleton_smash::consts::{WIDTH, HEIGHT, MAX_PLAYERS};

#[derive(Drop, Serde, Introspect)]
#[dojo::model]
struct RoomList {
    #[key]
    id: u32,
    room_max_id_for_level: Array<u32>, // Max room id for each level
}

#[generate_trait]
impl RoomListImpl of RoomListTrait {
    fn get_max_room_id_for_level(ref self: RoomList, level: u32) -> u32 {
        if level >= self.room_max_id_for_level.len() {
            0
        } else {
            *self.room_max_id_for_level.at(level)
        }
    }
    /// Increments the maximum room ID for a specific level in the RoomList.
    /// Used when a new room is created for a particular level to keep track of room IDs.
    fn increment_max_room_id_for_level(ref self: RoomList, level: u32, room_id: u32) -> RoomList {
        let mut room_max_id_for_level = ArrayTrait::new();
        let mut i = 0;
        loop {
            if i == self.room_max_id_for_level.len() {
                break;
            }
            if *self.room_max_id_for_level.at(i) != level {
                room_max_id_for_level.append(*self.room_max_id_for_level.at(i));
            } else {
                room_max_id_for_level.append(room_id);
            }
            i += 1;
        };
        RoomList { id: self.id, room_max_id_for_level }
    }
}

#[derive(Drop, Serde, Introspect)]
#[dojo::model]
struct Room {
    #[key]
    room_id: u32,
    map: felt252,
    player_positions: felt252,
    level: u32,
    run_ids: Array<u32>, // List of player ids in the room. At 5 players the room is killed
}

#[generate_trait]
impl RoomImpl of RoomTrait {
    fn new(room_id: u32, seed: felt252, level: u32) -> Room {
        let steps: u16 = 300;
        let mut map = MapTrait::new_random_walk(WIDTH, HEIGHT, steps, seed);

        map.open_with_corridor(1, 1);
        map.open_with_corridor(2, 1);
        map.open_with_corridor(3, 1);
        map.open_with_corridor(4, 1);
        map.open_with_corridor(5, 1);
        map.open_with_corridor(6, 1);
        map.open_with_corridor(7, 1);
        map.open_with_corridor(8, 1);
        map.open_with_corridor(9, 1);
        map.open_with_corridor(10, 1);
        map.open_with_corridor(11, 1);
        map.open_with_corridor(12, 1);

        map.open_with_corridor(249, 1);
        map.open_with_corridor(248, 1);

        map.open_with_corridor(241, 1);
        map.open_with_corridor(240, 1);
        // let distribution = map.compute_distribution(100, seed);
        Room { room_id, map: map.grid, player_positions: 0, level, run_ids: ArrayTrait::new() }
    }
    fn is_full(ref self: Room) -> bool {
        self.run_ids.len() == MAX_PLAYERS
    }
    fn does_room_exist(ref self: Room) -> bool {
        self.map != 0
    }
    fn add_player(ref self: Room, run_id: u32) -> Room {
        let mut run_ids = ArrayTrait::new();
        let mut i = 0;
        loop {
            if i == self.run_ids.len() {
                break;
            }
            run_ids.append(*self.run_ids.at(i));
            i += 1;
        };
        run_ids.append(run_id);
        Room { room_id: self.room_id, map: self.map, player_positions: self.player_positions, level: self.level, run_ids }
    }
}


