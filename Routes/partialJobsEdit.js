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
  const job_id = req.params.job_id;
  // const { jobTitle, jobType, jobDescription, deadlineDate, jobLink } = req.body;
  const {
    title,
    no_of_openings,
    qualifications_req,
    job_description,
    link,
    Deadline,
    responsibilities,
    about,
    job_status,
    job_type,
    posted_on,
    updated_on,
  } = req.body;

  try {
    const sql = "SELECT * FROM cso_jobs WHERE job_id = ?";
    con.query(sql, [job_id], async (err, rows) => {
      if (err) {
        console.error("Error during query execution:", err);
        res.status(500).json({ error: "Failed to get job posting" });
      } else if (rows.length === 0) {
        res.status(404).json({ error: "Job posting not found" });
      } else {
        const job = rows[0];

        const updatedJob = {
          title: title || job.title,
          job_type: job_type || job.job_type,
          no_of_openings: no_of_openings || job.no_of_openings,
          qualifications_req: qualifications_req || job.qualifications_req,
          job_description: job_description || job.job_description,
          link: link || job.link,
          Deadline: Deadline || job.Deadline,
          responsibilities: responsibilities || job.responsibilities,
          about: about || job.about,
          job_status: job_status || job.job_status,
          posted_on: posted_on || job.posted_on,
          updated_on: updated_on || job.updated_on,
        };

        const sql =
        "UPDATE cso_jobs SET title = ?, job_type = ?, no_of_openings = ?, qualifications_req = ?, job_description = ?, link = ?, Deadline = ?, responsibilities = ?, about = ?, job_status = ?, posted_on = ?, updated_on = ? WHERE job_id = ?";

        con.query(
          updateSql,
          [
            updatedJob.title,
            updatedJob.job_type,
            updatedJob.job_description,
            updatedJob.qualifications_req,
            updatedJob.job_description,
            updatedJob.link,
            updatedJob.Deadline,
            updatedJob.responsibilities,
            updatedJob.about,
            updatedJob.job_status,
            updatedJob.posted_on,
            updatedJob.updated_on,
            job_id,
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
