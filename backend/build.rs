use std::io::Result;
fn main() -> Result<()> {
    prost_build::compile_protos(&["src/trip.proto"], &["src/"])?;
    Ok(())
}
