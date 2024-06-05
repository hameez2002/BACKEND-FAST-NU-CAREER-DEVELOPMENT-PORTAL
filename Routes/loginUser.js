const db = require("../db.js"); // Assuming your db.js exports a connection object
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); // Import jwt library
const secretKey ="eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcwNjYyOTk0MSwiaWF0IjoxNzA2NjI5OTQxfQ.j1-U0NlilGG6u3BsPMvG3ZXfoHuotFoXI1KSkCZiA6g";

module.exports = async (req, res) => {
  const { user_id, password } = req.body;
  try {
    db.query(
      "SELECT * FROM sign_in WHERE user_id = ?",
      [user_id],
      async (err, results) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: "Internal Server Error" });
        } else if (results.length > 0) {
          const match = await bcrypt.compare(password, results[0].password);

          if (match) {
            console.log("Password matches!");
            const token = jwt.sign({ userId: results[0].user_id }, secretKey, {
              expiresIn: "1h",
            });
            // res.status(200).json({ token });
            return res.status(200).json({
              token,
              userId: results[0].user_id,
              userRole: results[0].user_roles,
            });
          } else {
            console.error("Invalid password");
            res.status(401).json({ error: "Invalid Credentials" });
          }
        } else {
          res.status(404).json({ error: "User not found" });
        }
      }
    );
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};



