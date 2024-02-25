const con = require("../db.js");

module.exports = (req, res) => {
  const { title } = req.query;
  let sql = "SELECT * FROM cso_jobs";
  const sqlParams = [];

  if (title) {
    sql += " WHERE title LIKE ?";
    sqlParams.push(`%${title}%`);
  }

  con.query(sql, sqlParams, (err, results) => {
    if (err) {
      console.error("Error during query execution:", err);
      // res.status(500).json({ error: "Failed to fetch job postings" });
      res
        .status(500)
        .json({ error: "Failed to fetch job postings", details: err.message });
    } else {
      console.log("Fetched job postings:", results);
      res.status(200).json(results);
    }
  });
};
