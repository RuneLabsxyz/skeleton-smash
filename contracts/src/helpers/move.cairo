use dojo::world::IWorldDispatcher;
use skeleton_smash::types::direction::Direction;
use skeleton_smash::helpers::bitmap::{pow2_const};
use skeleton_smash::consts::{WIDTH, HEIGHT};
use skeleton_smash::helpers::check_kill::{kill_player};

// this function will move the player in the room and return the new position
fn move_player(direction: Direction, map: felt252, player_positions: felt252, mut current_position: u8, room_id: u32, world: IWorldDispatcher) -> (u8, bool) {
    let mut is_exit = false;
    
    // Keep moving until we hit an edge or obstacle
    loop {
        // Check if next position is blocked in map or player_positions
        if check_out_of_bounds(WIDTH, HEIGHT, current_position, direction) {
            break; 
        }
        // Check if next position is blocked in map
        if check_blocked(map, WIDTH, HEIGHT, current_position, direction) {
            break; 
        }
        // Check if next position is blocked by player
        if check_blocked(player_positions, WIDTH, HEIGHT, current_position, direction) {
            // Kill the player
            let kill_position = get_next_position(direction, current_position, WIDTH);
            kill_player(kill_position, room_id, world);
            break; 
        }

        current_position = apply_move(direction, current_position, WIDTH);

        if check_exit(WIDTH, HEIGHT, current_position, direction) {
            is_exit = true;
            break;
        }
    };
    
    // Return final position
    return (current_position, is_exit);
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


/// Check if the position is out of bounds in the specified direction.
/// # Arguments
/// * `width` - The width of the grid
/// * `height` - The height of the grid
/// * `position` - The current position
/// * `direction` - The direction to check
/// # Returns
/// * Whether the position is out of bounds
#[inline]
fn check_out_of_bounds(width: u8, height: u8, position: u8, direction: Direction) -> bool {
    let (x, y) = (position % width, position / width);
    match direction {
        Direction::North => (y < height - 2) && (x != 0) && (x != width - 1),
        Direction::East => (x < width - 2) && (y != 0) && (y != height - 1),
        Direction::South => (y > 1) && (x != 0) && (x != width - 1),
        Direction::West => (x > 1) && (y != 0) && (y != height - 1),
        _ => false,
    }
}

/// Check if the position is blocked in the specified direction.
/// # Arguments
/// * `grid` - The grid as a bitmaps
/// * `width` - The width of the grid
/// * `height` - The height of the grid
/// * `position` - The current position
/// * `direction` - The direction to check
/// # Returns
/// * Whether the position is blocked
#[inline]
fn check_blocked(grid: felt252, width: u8, height: u8, position: u8, direction: Direction) -> bool {
    let (x, y) = (position % width, position / width);
    let next_position = match direction {
        Direction::North => (y - 1) * width + x,
        Direction::South => (y + 1) * width + x,
        Direction::East => y * width + (x + 1),
        Direction::West => y * width + (x - 1),
        _ => position,
    };

    // Check if there is a wall at the next position using the grid bitmap
    let bit_position = pow2_const(next_position);
    let result = grid.try_into().unwrap() & bit_position;
    result != 0_u256
}

/// Get the next position in the specified direction.
#[inline]
fn get_next_position(direction: Direction, current_position: u8, width: u8) -> u8 {
    match direction {
        Direction::North => (current_position / width - 1) * width + current_position % width,
        Direction::South => (current_position / width + 1) * width + current_position % width,
        Direction::East => current_position / width * width + (current_position % width + 1),
        Direction::West => current_position / width * width + (current_position % width - 1),
        _ => current_position,
    }
}

/// Check if there is obstacle in the specified direction.
/// # Arguments
/// * `grid` - The grid as a bitmaps
/// * `width` - The width of the grid
/// * `height` - The height of the grid
/// * `position` - The current position
/// # Returns
/// * Whether there is an obstacle in the specified direction
#[inline]
fn check_obstacle(grid: felt252, width: u8, height: u8, position: u8) -> bool {
    let bit_position = pow2_const(position);
    let result = grid.try_into().unwrap() & bit_position;
    result != 0_u256
}

/// Check if the position is the exit
/// # Arguments
/// * `width` - The width of the grid
/// * `height` - The height of the grid
/// * `position` - The current position
/// # Returns
/// * Whether the position is the exit
#[inline]
fn check_exit(width: u8, height: u8, position: u8, direction: Direction) -> bool {

    let is_north = match direction {
        Direction::North => true,
        _ => false,
    };

    let bit_position = pow2_const(position);
    bit_position == 245_u256 && is_north
}
