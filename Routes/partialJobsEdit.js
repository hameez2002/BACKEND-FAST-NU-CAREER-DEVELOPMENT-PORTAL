// const con = require("../db.js");

// module.exports = async (req, res) => {
//   const jobId = req.params.id;
//   const { jobTitle, jobType, jobDescription, deadlineDate, jobLink } = req.body;

//   try {
//     const sql = "SELECT * FROM jobs WHERE id = ?";
//     con.query(sql, [jobId], async (err, rows) => {
//       if (err) {
//         console.error("Error during query execution:", err);
//         res.status(500).json({ error: "Failed to get job posting" });
//       } else if (rows.length === 0) {
//         res.status(404).json({ error: "Job posting not found" });
//       } else {
//         const job = rows[0];

//         const updatedJob = {
//           Title: jobTitle || job.Title,
//           Type: jobType || job.Type,
//           Description: jobDescription || job.Description,
//           Link: jobLink || job.Link,
//           Deadline: deadlineDate || job.Deadline,
//         };

//         const sql =
//           "UPDATE jobs SET Title = ?, Type = ?, Description = ?, Deadline = ?, Link = ? WHERE ID = ?";

//         con.query(
//           sql,
//           [
//             updatedJob.jobTitle,
//             updatedJob.jobType,
//             updatedJob.jobDescription,
//             updatedJob.deadlineDate,
//             updatedJob.jobLink,
//             jobId,
//           ],
//           (err2, results) => {
//             if (err2) {
//               console.error("Error during query execution:", err2);
//               res.status(500).json({ error: "Failed to update job posting" });
//             } else {
//               res.status(200).send("Job updated successfully");
//             }
//           }
//         );
//       }
//     });
//   } catch (error) {
//     console.error("Error updating job:", error);
//     res.status(500).send("Error updating job");
//   }
// };

// backend/partialJobEdit.js
const con = require("../db.js");

module.exports = async (req, res) => {
  const jobId = req.params.id;
  const { jobTitle, jobType, jobDescription, deadlineDate, jobLink } = req.body;

  try {
    const sql = "SELECT * FROM jobs WHERE ID = ?";
    con.query(sql, [jobId], async (err, rows) => {
      if (err) {
        console.error("Error during query execution:", err);
        res.status(500).json({ error: "Failed to get job posting" });
      } else if (rows.length === 0) {
        res.status(404).json({ error: "Job posting not found" });
      } else {
        const job = rows[0];

        const updatedJob = {
          Title: jobTitle || job.Title,
          Type: jobType || job.Type,
          Description: jobDescription || job.Description,
          Link: jobLink || job.Link,
          Deadline: deadlineDate || job.Deadline,
        };

        const updateSql =
          "UPDATE jobs SET title = ?, job_type = ?, no_of_openings = ?, qualification_req = ?, job_description = ?, responsibilities = ?, about = ?, job_status = ? WHERE ID = ?";

        con.query(
          updateSql,
          [
            updatedJob.Title,
            updatedJob.Type,
            updatedJob.Description,
            updatedJob.Deadline,
            updatedJob.Link,
            jobId,
          ],
          (err2, results) => {
            if (err2) {
              console.error("Error during query execution:", err2);
              res.status(500).json({ error: "Failed to update job posting" });
            } else {
              res.status(200).send("Job updated successfully");
            }
          }
        );
      }
    });
  } catch (error) {
    console.error("Error updating job:", error);
    res.status(500).send("Error updating job");
  }
};
