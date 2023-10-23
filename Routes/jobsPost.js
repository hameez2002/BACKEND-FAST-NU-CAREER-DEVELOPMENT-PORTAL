const con = require("../db.js");

module.exports = (req, res) => {
  console.log("Received request body:", req.body);
  const {
    jobTitle: Title,
    jobDescription: Description,
    jobLink: Link,
    deadlineDate: Deadline,
    jobType: Type,
  } = req.body;
  const sql =
    "INSERT INTO jobs (Title, Type, Description, Link, Deadline) VALUES (?, ?, ?, ?, ?)";
  con.query(sql, [Title, Type, Description, Link, Deadline], (err, result) => {
    if (err) {
      console.error("Error during query execution:", err);
      throw err;
    }
    console.log("Query result:", result);
    res.redirect("/jobs");
  });
};


