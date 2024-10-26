// const { Pool } = require("pg");

// // Configure the pool for local PostgreSQL connection
// const pool = new Pool({
//   user: "postgres", // replace with your local PostgreSQL username
//   host: "localhost",
//   database: "postgres", // replace with your local database name
//   password: "kartikeya", // replace with your local password
//   port: 5432, // default PostgreSQL port
// });

// // Test the connection
// pool.query("SELECT NOW()", (err, res) => {
//   if (err) {
//     console.error("Error connecting to the database:", err.stack);
//   } else {
//     console.log("Connected to the database successfully at:", res.rows[0].now);
//   }
// });

// module.exports = pool;

const { Pool } = require("pg");

const pool = new Pool({
  connectionString:
    "postgresql://db_jraj_user:ZUYbgFp0vYU7UktfZ8CbIsaaopBkRmVC@dpg-csecvltsvqrc73f0sccg-a.oregon-postgres.render.com/db_jraj",
  ssl: { rejectUnauthorized: false }, // Ensure SSL is properly configured for Render
});

// Test the connection
pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Error connecting to the database:", err.stack);
  } else {
    console.log("Connected to the database successfully at:", res.rows[0].now);
  }
});

module.exports = pool;
