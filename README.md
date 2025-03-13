To run this:

1. Download some data from https://www.citibikenyc.com/system-data. Be sure to use the new schema. Downloading a monthly data CSV from 2025 should be sufficient. Store this data as `data/citibike-tripdata.csv`.
2. Build the frontend using `cd frontend; npm install; node ./build.js`.
3. Run the backend using `cd backend; cargo run --release`.
4. Navigate to `https://localhost:3000` in your browser, and accept the self-signed certificate.
