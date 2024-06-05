const mysql = require("mysql");

const con = mysql.createPool({
  // connectionLimit: 10,
  // host: process.env.DB_HOST || "localhost",
  // user: process.env.DB_USER || "root",
  // password: process.env.DB_PASSWORD || "",
  // database: process.env.DB_DBNAME || "backend",
  // waitForConnections: true,
  // queueLimit:0
  host: "localhost",
  user: "root",
  password: "",
  database: "cdp",
});

// console.log(process.env.DB_HOST);
module.exports = con;
