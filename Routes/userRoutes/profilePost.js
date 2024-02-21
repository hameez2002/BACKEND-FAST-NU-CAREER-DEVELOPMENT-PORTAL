// userProfilePost.js
const con = require("../../db.js");

module.exports = (req, res) => {
  console.log("Received request body:", req.body);

  const {
    firstName,
    lastName,
    contact,
    discipline,
    gradYear,
    cgpa,
    tagline,
    personalStatement,
    certificates,
    experiences,
  } = req.body;

  // Insert into student_profile table
  const studentProfileSql =
    "INSERT INTO student_profile (user_id, fname, lname, contact, discipline, year_of_graduation, cgpa, tagline, personal_statement) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
  con.query(
    studentProfileSql,
    [
      req.user.id,
      firstName,
      lastName,
      contact,
      discipline,
      gradYear,
      cgpa,
      tagline,
      personalStatement,
    ],
    (err, studentProfileResult) => {
      if (err) {
        console.error("Error inserting into student_profile table:", err);
        return res.status(500).send("Internal Server Error");
      }

      console.log("Inserted into student_profile table:", studentProfileResult);

      // Insert into certificates table
      const certificatesSql =
        "INSERT INTO certificates (user_id, certificate) VALUES ?";
      const certificatesValues = certificates.map((certificate) => [
        req.user.id,
        certificate,
      ]);
      con.query(
        certificatesSql,
        [certificatesValues],
        (err, certificatesResult) => {
          if (err) {
            console.error("Error inserting into certificates table:", err);
            return res.status(500).send("Internal Server Error");
          }

          console.log("Inserted into certificates table:", certificatesResult);

          // Insert into experiences table
          const experiencesSql =
            "INSERT INTO experiences (user_id, experience) VALUES ?";
          const experiencesValues = experiences.map((experience) => [
            req.user.id,
            experience,
          ]);
          con.query(
            experiencesSql,
            [experiencesValues],
            (err, experiencesResult) => {
              if (err) {
                console.error("Error inserting into experiences table:", err);
                return res.status(500).send("Internal Server Error");
              }

              console.log(
                "Inserted into experiences table:",
                experiencesResult
              );

              // Send response indicating successful insertion
              res.status(200).send("Profile data saved successfully");
            }
          );
        }
      );
    }
  );
};
