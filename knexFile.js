// const knex = require("knex")({
//   client: "mysql",
//   connection: {
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "cdp",
//   },
// });

// module.exports = knex;

// const knex = require("knex")({
//   client: "mysql",
//   connection: {
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "cdp",
//   },
// });

// module.exports = knex;


const db = require("./db"); // Import the MySQL connection pool from db.js

const knex = require("knex")({
  client: "mysql",
  connection: {
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_DBNAME || "backend",
  },
});

module.exports = knex;
