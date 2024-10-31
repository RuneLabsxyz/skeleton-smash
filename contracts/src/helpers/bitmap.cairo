use skeleton_smash::helpers::power::pow2_const;

fn set_player_bitmap(player_positions: felt252, new_position: u8) -> felt252 {
    let bit_position = pow2_const(new_position);
    let result = player_positions.try_into().unwrap() | bit_position;
    result.try_into().unwrap()
}

fn clear_player_bitmap(player_positions: felt252, old_position: u8) -> felt252 {
    let bit_position = pow2_const(old_position);
    let result = player_positions.try_into().unwrap() & (~bit_position);
    result.try_into().unwrap()
}
