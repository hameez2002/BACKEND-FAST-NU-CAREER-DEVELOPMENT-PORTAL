const db = require("../db.js");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

module.exports = async (req, res) => {
  const { user_id, password, email } = req.body;
  const user_roles = req.body.user_roles || "";

  try {
    // Check if the user already exists
    const existingUser = await new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM sign_in WHERE user_id = ?",
        [user_id],
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results[0]);
          }
        }
      );
    });

    if (existingUser) {
      console.log("User already exists");
      return res
        .status(400)
        .json({ error: "User with this user id already exists" });
    }

    // Hash password before saving to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
      "INSERT INTO sign_in (user_id, password, user_roles, email) VALUES (?, ?, ?, ?)",
      [user_id, hashedPassword, parseInt(user_roles), email],
      async (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: "Internal Server Error" });
        } else {
          // Insert user_id into student_profile table
          db.query(
            "INSERT INTO student_profile (user_id) VALUES (?)",
            [user_id],
            (err, result) => {
              if (err) {
                console.error(err);
                res.status(500).json({ error: "Internal Server Error" });
              } else {
                // Send a welcome email
                //   try {
                //     const transporter = nodemailer.createTransport({
                //       host: "127.0.0.1",
                //       port: 1025,
                //       secure: false,
                //       auth: {
                //         user: "cdp-portal@proton.me",
                //         pass: "Cdp123_321",
                //       },
                //     });

                //     await transporter.sendMail({
                //       from: "cdp-portal@proton.me",
                //       to: email,
                //       subject: "Welcome to Your App",
                //       text: "Thank you for registering with Your App!",
                //     });
                //   } catch (emailError) {
                //     console.error("Error sending welcome email:", emailError);
                //   }

                res
                  .status(201)
                  .json({ message: "User registered successfully" });
              }
            }
          );
        }
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
