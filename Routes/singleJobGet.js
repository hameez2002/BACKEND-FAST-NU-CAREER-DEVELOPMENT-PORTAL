const con = require("../db.js");

module.exports = (req, res) => {
  const job_id = req.params.id;

  const sql = "SELECT * FROM cso_jobs WHERE job_id = ?";
  const sqlParams = [job_id];

  con.query(sql, sqlParams, (err, results) => {
    if (err) {
      console.error("Error during query execution:", err);
      res.status(500).json({ error: "Failed to fetch job details", details: err.message });
    } else {
      if (results.length > 0) {
        const job = results[0];
        res.status(200).json(job);
      } else {
        res.status(404).json({ error: "Job not found" });
      }
    }
  });
};
