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
    connection: db,
  },
});

module.exports = knex;
