const con = require("../db.js");

module.exports = (req, res) => {
  console.log("Received request body:", req.body);
  const {
    jobTitle: title,
    noOfOpenings: no_of_openings,
    qualificationRequirements: qualifications_req,
    jobDescription: job_description,
    jobLink: link,
    deadlineDate: Deadline,
    responsibilities,
    about,
    jobStatus: job_status,
    jobType: job_type,
    postedOn: posted_on,
    updatedOn: updated_on,
  } = req.body;

  const sql =
    "INSERT INTO cso_jobs (title, job_type, no_of_openings, qualifications_req, job_description,link, Deadline, responsibilities, about, job_status,posted_on,updated_on) VALUES (?, ?, ?, ?, ?,?,?,?,?,?,?,?)";
  con.query(
    sql,
    [
      title,
      job_type,
      no_of_openings,
      qualifications_req,
      job_description,
      link,
      Deadline,
      responsibilities,
      about,
      job_status,
      posted_on,
      updated_on,
    ],
    (err, result) => {
      if (err) {
        console.error("Error during query execution:", err);
        throw err;
      }
      console.log("Query result:", result);
      res.redirect("/jobs");
    }
  );
};
