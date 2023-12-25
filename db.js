const mysql = require("mysql");

const con = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "",
  database: "backend",
});

module.exports = con;
