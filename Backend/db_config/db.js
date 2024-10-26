const { Pool } = require("pg");

const pool = new Pool({
  connectionString:
    "postgresql://productmanagement_p05a_user:d20jPJ2iuFybwGaKkHjdYujuWSTKgufs@dpg-cse9kirtq21c73874gog-a.oregon-postgres.render.com:5432/productmanagement_p05a",
  ssl: { rejectUnauthorized: false },
});

pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Error connecting to the database:", err.stack);
  } else {
    console.log("Connected to the database successfully at:", res.rows[0].now);
  }
  pool.end();
});
