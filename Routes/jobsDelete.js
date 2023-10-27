const con = require("../db.js");

module.exports = (req, res) => {
  const jobId = req.params.id;
  const sql = "DELETE FROM jobs WHERE id = ?";
  con.query(sql, [jobId], (err, results) => {
    if (err) {
      console.error("Error during query execution:", err);
      res.status(500).json({ error: "Failed to delete job posting" });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ error: "Job posting not found" });
    } else {
      res.status(204).send();
    }
  });
};
