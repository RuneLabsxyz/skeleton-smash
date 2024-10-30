use starknet::ContractAddress;
use origami_map::map::{MapTrait};

#[derive(Drop, Serde, Introspect)]
#[dojo::model]
struct RoomList {
    #[key]
    id: u32,
    room_max_id_for_level: Array<u32>, // Max room id for each level
}

#[generate_trait]
impl RoomListImpl of RoomListTrait {
    /// Increments the maximum room ID for a specific level in the RoomList.
    /// Used when a new room is created for a particular level to keep track of room IDs.
    fn increment_max_room_id_for_level(ref self: RoomList, level: u32) {
        let mut room_max_id_for_level = ArrayTrait::new();
        let mut i = 0;
        loop {
            if i == self.room_max_id_for_level.len() {
                break;
            }
            if *self.room_max_id_for_level.at(i) != level {
                room_max_id_for_level.append(*self.room_max_id_for_level.at(i));
            } else {
                room_max_id_for_level.append(*self.room_max_id_for_level.at(i) + 1);
            }
            i += 1;
        };
        self.room_max_id_for_level = room_max_id_for_level;
    }
}

#[derive(Drop, Serde, Introspect)]
#[dojo::model]
struct Room {
    #[key]
    room_id: u32,
    map: felt252,
    level: u32,
    player_ids: Array<u32>, // List of player ids in the room, capped at 5 The room is killed
}

#[generate_trait]
impl RoomImpl of RoomTrait {
    fn new(room_id: u32, seed: felt252, level: u32) -> Room {
        let cave_map = MapTrait::new_cave(14, 18, 3, seed);
        Room { room_id, map: cave_map.grid, level, player_ids: ArrayTrait::new() }
    }
}


