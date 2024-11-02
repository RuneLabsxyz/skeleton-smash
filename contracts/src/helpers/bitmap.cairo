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

#[cfg(test)]
mod bitmap_tests {
    use skeleton_smash::helpers::bitmap::{set_player_bitmap, clear_player_bitmap};

    #[test]
    fn test_set_player_bitmap_bit_0() {
        let player_positions = 0; // 0b0000
        let new_position = 0; // Set bit at position 0
        let result = set_player_bitmap(player_positions, new_position);
        assert_eq!(result, 1); // 0b0001
    }

    #[test]
    fn test_set_player_bitmap_bit_24() {
        let player_positions = 0; // 0b0000
        let new_position = 24; // Set bit at position 24
        let result = set_player_bitmap(player_positions, new_position);
        assert_eq!(result, 16_777_216); // 2^24
    }

    #[test]
    fn test_set_player_bitmap_multiple_bits() {
        let player_positions = 4; // 0b0100
        let new_position = 1; // Set bit at position 1
        let result = set_player_bitmap(player_positions, new_position);
        assert_eq!(result, 6); // 0b0110
    }

    #[test]
    fn test_clear_player_bitmap_bit_set() {
        let player_positions = 3; // 0b0011
        let old_position = 0; // Clear bit at position 0
        let result = clear_player_bitmap(player_positions, old_position);
        assert_eq!(result, 2); // 0b0010
    }

    #[test]
    fn test_clear_player_bitmap_bit_not_set() {
        let player_positions = 4; // 0b0100
        let old_position = 1; // Clear bit at position 1
        let result = clear_player_bitmap(player_positions, old_position);
        assert_eq!(result, 4); // 0b0100 (unchanged)
    }
}