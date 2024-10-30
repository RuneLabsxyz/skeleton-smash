use skeleton_smash::models::Direction;
use skeleton_smash::models::Position;

// define the interface
#[dojo::interface]
trait IActions {
    fn spawn(ref world: IWorldDispatcher);
}

// dojo decorator
#[dojo::contract]
mod actions {
    use super::IActions;
    use starknet::{ContractAddress, get_caller_address};
    use skeleton_smash::models::{Position, Vec2, Moves, Direction, DirectionsAvailable};


    #[abi(embed_v0)]
    impl ActionsImpl of IActions<ContractState> {
        fn spawn(ref world: IWorldDispatcher) {
            // Get the address of the current caller, possibly the player's address.
            let player = get_caller_address();
            // Retrieve the player's current position from the world.
            let position = get!(world, player, (Position));
            // Update the world state with the new data.
            // 1. Set the player's remaining moves to 100.
            // 2. Move the player's position 10 units in both the x and y direction.

        }
    }
}
