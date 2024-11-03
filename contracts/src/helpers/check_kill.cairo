use skeleton_smash::helpers::bitmap::{clear_player_bitmap};
use dojo::world::IWorldDispatcher;
use skeleton_smash::models::player::{Player, Run, Position};
use skeleton_smash::models::map::{Room};

fn kill_player(kill_player_position: u8, room_id: u32, world: IWorldDispatcher) {

    let mut room = get!(world, room_id, (Room));

    let mut i = 0;
    loop {
        if i == room.run_ids.len() {
            break;
        }
        let run_id = *room.run_ids.at(i);
        let mut pos = get!(world, run_id, (Position));

        if pos.pos == kill_player_position {
            let mut run = get!(world, run_id, (Run));

            // Mark the run as dead
            if run.is_dead {
                break;
            }

            run.is_dead = true;
            let contract_address = run.player;

            // Reset the player
            let mut player = get!(world, contract_address, (Player));
            player.run_history.append(run_id);
            player.run_id = 0;
            player.in_run = false;

            set!(world, (run, player));
            break;
        }
        i += 1;
    };
}