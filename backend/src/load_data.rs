use std::error::Error;

use crate::trip::Trip;

pub fn load_data() -> Result<Vec<Trip>, Box<dyn Error>> {
    let mut rdr = csv::ReaderBuilder::new()
        .has_headers(true)
        .terminator(csv::Terminator::CRLF)
        .trim(csv::Trim::None)
        .from_path("../data/citibike-tripdata.csv")?;
    let mut trips = Vec::new();

    for result in rdr.deserialize() {
        let trip: Trip = result?;
        trips.push(trip);
    }

    Ok(trips)
}
