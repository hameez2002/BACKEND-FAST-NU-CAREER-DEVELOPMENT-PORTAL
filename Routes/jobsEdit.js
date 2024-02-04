const con = require("../db.js");

module.exports = async (req, res) => {
  const job_id = req.params.job_id;
  const { title, job_type, no_of_openings, qualification_req, job_description, responsibilities, about, job_status } = req.body;

  try {
    const sql =
      "UPDATE jobs SET title = ?, job_type = ?, no_of_openings = ?, qualification_req = ?, job_description = ?, responsibilities = ?, about = ?, job_status= ? WHERE job_id = ?";
    con.query(
      sql,
      [title, job_type, no_of_openings, qualification_req, job_description, responsibilities, about, job_status, job_id],
      (err, results) => {
        if (err) {
          console.error("Error during query execution:", err);
          res.status(500).json({ error: "Failed to update job posting" });
        } else if (results.affectedRows === 0) {
          res
            .status(404)
            .json({ error: "Job posting not found for ID: " + job_id});
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
