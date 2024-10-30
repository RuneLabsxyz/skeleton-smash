use starknet::ContractAddress;

#[derive(Drop, Serde, Introspect)]
#[dojo::model]
struct Player {
    #[key]
    contract_address: ContractAddress,
    run_id: u32, // if 0, the player is not in a run
    run_history: Array<u32>, // history of run ids
}   

#[generate_trait]
impl PlayerImpl of PlayerTrait {
    fn set_run_id(ref self: Player, run_id: u32) -> Player {
        //TODO correct run history
        Player { contract_address: self.contract_address, run_id, run_history: ArrayTrait::new() }
    }
}

#[derive(Copy, Drop, Serde, Introspect)]
#[dojo::model]
struct Run {
    #[key]
    run_id: u32,
    player: ContractAddress, 
    level: u32, // current level
    move_count: u32, // remaining moves for that level
}

#[generate_trait]
impl RunImpl of RunTrait {
    fn new(run_id: u32, player: ContractAddress, level: u32) -> Run {
        Run { run_id, player, level, move_count: 0 }
    }
}

#[derive(Drop, Copy, Serde)]
#[dojo::model]
struct Position {
    #[key]
    run_id: u32,
    pos: u8,
}
 