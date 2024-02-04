const con = require("../db.js");

module.exports = (req, res) => {
  const sql = "SELECT * FROM jobs";
  con.query(sql, (err, results) => {
    if (err) {
      console.error("Error during query execution:", err);
      // res.status(500).json({ error: "Failed to fetch job postings" });
      res.status(500).json({ error: "Failed to fetch job postings", details: err.message });
    } else {
      console.log("Fetched job postings:", results);
      res.status(200).json(results);
    }
  });
};
