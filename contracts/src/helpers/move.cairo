use skeleton_smash::types::direction::Direction;

// this function will move the player in the room and return the new position
fn move_player(direction: Direction, map: felt252, player_positions: felt252, mut current_position: u8) -> u8 {
    let width = 14;
    let height = 18;    
    
    // Keep moving until we hit an edge or obstacle
    loop {
        // Check if next position is blocked in map or player_positions
        if check(map, width, height, current_position, direction) {
            break; 
        }
        if check(player_positions, width, height, current_position, direction) {
            break; 
        }

        current_position = apply_move(direction, current_position, width);
    };
    
    // Return final position
    current_position
}

#[inline]
fn apply_move(direction: Direction, current_position: u8, width: u8) -> u8 {
    let (x, y) = (current_position % width, current_position / width);
    match direction {
        Direction::North => (y - 1) * width + x,
        Direction::South => (y + 1) * width + x,
        Direction::East => y * width + (x + 1),
        Direction::West => y * width + (x - 1),
        _ => current_position,
    }
}


/// Check if the position can be visited in the specified direction.
/// # Arguments
/// * `grid` - The grid
/// * `width` - The width of the grid
/// * `height` - The height of the grid
/// * `position` - The current position
/// * `direction` - The direction to check
/// # Returns
/// * Whether the position can be visited
#[inline]
fn check(grid: felt252, width: u8, height: u8, position: u8, direction: Direction) -> bool {
    let (x, y) = (position % width, position / width);
    match direction {
        Direction::North => (y < height - 2) && (x != 0) && (x != width - 1),
        Direction::East => (x < width - 2) && (y != 0) && (y != height - 1),
        Direction::South => (y > 1) && (x != 0) && (x != width - 1),
        Direction::West => (x > 1) && (y != 0) && (y != height - 1),
        _ => false,
    }
}

