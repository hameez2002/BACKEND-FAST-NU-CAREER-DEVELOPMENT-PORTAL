const con = require("../db.js");

module.exports = async (req, res) => {
  const jobId = req.params.id;
  const { jobTitle, jobType, jobDescription, deadlineDate, jobLink } = req.body;

  try {
    const sql =
      "UPDATE jobs SET Title = ?, Type = ?, Description = ?, Deadline = ?, Link = ? WHERE ID = ?";
    con.query(
      sql,
      [jobTitle, jobType, jobDescription, deadlineDate, jobLink, jobId],
      (err, results) => {
        if (err) {
          console.error("Error during query execution:", err);
          res.status(500).json({ error: "Failed to update job posting" });
        } else if (results.affectedRows === 0) {
          res
            .status(404)
            .json({ error: "Job posting not found for ID: " + jobId });
        } else {
          res.status(200).send("Job updated successfully");
        }
      }
    );
  } catch (error) {
    console.error("Error updating job:", error);
    res.status(500).send("Error updating job");
  }
};
