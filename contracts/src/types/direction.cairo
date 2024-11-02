#[derive(Copy, Drop, Serde, Introspect)]
pub enum Direction {
    None,
    North,
    East,
    South,
    West,
}
