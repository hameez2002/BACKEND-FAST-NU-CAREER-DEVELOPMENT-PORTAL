const con = require("../db.js");

module.exports = (req, res) => {
  console.log("Received request body:", req.body);
  const {
    jobTitle: title,
    noOfOpenings:no_of_openings,
    qualificationRequirements: qualification_req,
    jobDescription: job_description,
    responsibilities,
    about,
    jobStatus: job_status,
    jobType: job_type
  } = req.body;

  const sql =
    "INSERT INTO jobs (title, job_type, no_of_openings, qualification_req, job_description, responsibilities, about, job_status) VALUES (?, ?, ?, ?, ?,?,?,?)";
  con.query(sql, [title, job_type, no_of_openings, qualification_req, job_description, responsibilities, about, job_status], (err, result) => {
    if (err) {
      console.error("Error during query execution:", err);
      throw err;
    }
    console.log("Query result:", result);
    res.redirect("/jobs");
  });
};


