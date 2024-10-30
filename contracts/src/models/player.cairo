use starknet::ContractAddress;

#[derive(Drop, Serde, Introspect)]
#[dojo::model]
struct Player {
    #[key]
    contract_address: ContractAddress,
    run_id: u32, // if 0, the player is not in a run
    run_history: Array<u32>, // history of run ids
}   

#[derive(Copy, Drop, Serde, Introspect)]
#[dojo::model]
struct Run {
    #[key]
    run_id: u32,
    player: ContractAddress, 
    level: u32, // current level 
    moves: u32, // remaining moves for that level
}

#[derive(Drop, Copy, Serde)]
#[dojo::model]
struct Position {
    #[key]
    run_id: u32,
    vec: Vec2,
}
 
#[derive(Drop, Copy, Serde, Introspect)]
struct Vec2 {
    x: u32,
    y: u32
}