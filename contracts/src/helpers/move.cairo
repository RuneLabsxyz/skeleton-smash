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
    match direction {
        Direction::North => current_position + width,
        Direction::South => current_position - width,
        Direction::East => current_position + 1,
        Direction::West => current_position - 1,
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
    match direction {
        Direction::North => position >= width * (height - 1),
        Direction::East => position % width == width - 1, 
        Direction::South => position < width, 
        Direction::West => position % width == 0, 
        _ => true,
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
    let next_position = get_next_position(direction, position, width);

    // Check if there is a wall at the next position using the grid bitmap
    let bit_position = pow2_const(next_position);
    let result = grid.try_into().unwrap() & bit_position;
    result != 0_u256
}

/// Get the next position in the specified direction.
#[inline]
fn get_next_position(direction: Direction, current_position: u8, width: u8) -> u8 {
    match direction {
        Direction::North => current_position + width,
        Direction::South => current_position - width,
        Direction::East => current_position + 1,
        Direction::West => current_position - 1,
        _ => current_position,
    }
}

/// Check if there is obstacle at a position.
/// # Arguments
/// * `grid` - The grid as a bitmaps
/// * `width` - The width of the grid
/// * `height` - The height of the grid
/// * `position` - The current position
/// # Returns
/// * Whether there is an obstacle
#[inline]
fn check_obstacle(grid: felt252, position: u8) -> bool {
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


#[cfg(test)]
mod tests {
    use skeleton_smash::types::direction::Direction;
    use skeleton_smash::consts::{WIDTH, HEIGHT};
    use skeleton_smash::helpers::move::{apply_move, check_blocked, check_exit, check_obstacle, get_next_position, check_out_of_bounds};

    #[test]
    fn test_apply_move() {
        let new_position = apply_move(Direction::North, 0, WIDTH);
        assert_eq!(new_position, 14);
    }
    #[test]
    fn test_apply_move_2() {
        let new_position = apply_move(Direction::East, 0, WIDTH);
        assert_eq!(new_position, 0 + 1);
    }
    #[test]
    fn test_apply_move_3() {
        let new_position = apply_move(Direction::South, 87, WIDTH);
        assert_eq!(new_position, 87 - 14);
    }

    #[test]
    fn test_check_out_of_bounds() {
        let is_out_of_bounds = check_out_of_bounds(WIDTH, HEIGHT, 249, Direction::North);
        assert_eq!(is_out_of_bounds, true);
    }
    #[test]
    fn test_check_out_of_bounds_2() {
        let is_out_of_bounds = check_out_of_bounds(WIDTH, HEIGHT, 3, Direction::South);
        assert_eq!(is_out_of_bounds, true);
    }
    #[test]
    fn test_check_out_of_bounds_3() {
        let is_out_of_bounds = check_out_of_bounds(WIDTH, HEIGHT, 14, Direction::West);
        assert_eq!(is_out_of_bounds, true);
    }
    #[test]
    fn test_check_out_of_bounds_5() {
        let is_out_of_bounds = check_out_of_bounds(WIDTH, HEIGHT, 13, Direction::East);
        assert_eq!(is_out_of_bounds, true);
    }

    /// Check wall blocks
    #[test]
    fn test_check_blocked() {
        // Empty grid (no walls)
        let empty_grid = 0;

        // Test moving north from position 14, expecting no block since grid is empty
        let is_blocked = check_blocked(empty_grid, WIDTH, HEIGHT, 14, Direction::North);
        assert_eq!(is_blocked, false);

        // Define a grid with a wall at position 8 (next position if moving north from 14)
        let wall_grid = 2;

        // Now moving north from position 14 should hit a block
        let is_blocked_2 = check_blocked(wall_grid, WIDTH, HEIGHT, 0, Direction::East);
        assert_eq!(is_blocked_2, true);

        let is_blocked_3 = check_blocked(wall_grid, WIDTH, HEIGHT, 2, Direction::West);
        assert_eq!(is_blocked_3, true);

        let is_blocked_4 = check_blocked(wall_grid, WIDTH, HEIGHT, 1 + 14, Direction::South);
        assert_eq!(is_blocked_4, true);
    }

    #[test]
    fn test_check_blocked_2() {
        let wall_grid = 16384; // aka 15th bit

        let is_blocked = check_blocked(wall_grid, WIDTH, HEIGHT, 28, Direction::South);
        assert_eq!(is_blocked, true);

        let is_blocked_2 = check_blocked(wall_grid, WIDTH, HEIGHT, 0, Direction::North);
        assert_eq!(is_blocked_2, true);
    }

    #[test]
    fn test_check_obstacle() {
        let wall_grid = 16384; // aka 15th bit
        let is_obstacle = check_obstacle(wall_grid, 14); // bit pos - 1 as we start counting from 0
        assert_eq!(is_obstacle, true);

        let wall_grid_2 = 8388608; // aka 24th bit
        let is_obstacle_2 = check_obstacle(wall_grid_2, 23); // bit pos - 1 as we start counting from 0
        assert_eq!(is_obstacle_2, true);
    }
}
