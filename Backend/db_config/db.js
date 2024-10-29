const { Pool } = require("pg");

const pool = new Pool({
  connectionString:
    "postgresql://db_jraj_user:ZUYbgFp0vYU7UktfZ8CbIsaaopBkRmVC@dpg-csecvltsvqrc73f0sccg-a.oregon-postgres.render.com/db_jraj",
  ssl: { rejectUnauthorized: false },
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Error connecting to the database:", err.stack);
  } else {
    console.log("Connected to the database successfully at:", res.rows[0].now);
  }
});

// Funtion to avoid database to go in sleep mode
setInterval(() => {
  pool.query("SELECT 1", (err) => {
    if (err) console.error("Keep-alive query failed:", err.stack);
    else console.log("Keep-alive query succeeded");
  });
}, 5 * 60 * 1000);

module.exports = pool;
