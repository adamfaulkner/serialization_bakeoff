use bebop_tools as bebop;
use std::io::Result;

fn main() -> Result<()> {
    prost_build::compile_protos(&["src/trip.proto"], &["src/"])?;
    // download the bebop binary automatically and cache it into your target directory
    // it will automatically download the same version as the package you installed
    bebop::download_bebopc(std::path::PathBuf::from("target").join("bebopc"));
    // build all `.bop` schemas in `schemas` dir and make a new module `generated` in `src` with all of them.
    bebop::build_schema_dir(
        "../schemas",
        "src/generated",
        &bebop::BuildConfig::default(),
    );

    // ugh
    capnpc::CompilerCommand::new()
        .src_prefix("../schemas")
        .file("../schemas/trip.capnp")
        .run()
        .expect("schema compiler command");

    Ok(())
}
