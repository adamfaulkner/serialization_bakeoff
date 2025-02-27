pub mod load_data;
pub mod trip;

fn main() {
    println!("Hello, world!");

    let start = std::time::Instant::now();
    let data = load_data::load_data().unwrap();
    let elapsed = start.elapsed();
    println!("Loaded {} trips", data.len());
    println!("First trip: {:?}", data[0]);
    println!("Elapsed time: {:?}", elapsed);
}
