const { Pool } = require("pg");

const pool = new Pool({
  connectionString:
    "postgresql://db_jraj_user:ZUYbgFp0vYU7UktfZ8CbIsaaopBkRmVC@dpg-csecvltsvqrc73f0sccg-a.oregon-postgres.render.com/db_jraj",
  ssl: { rejectUnauthorized: false },
});

pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Error connecting to the database:", err.stack);
  } else {
    console.log("Connected to the database successfully at:", res.rows[0].now);
  }
});

module.exports = pool;
