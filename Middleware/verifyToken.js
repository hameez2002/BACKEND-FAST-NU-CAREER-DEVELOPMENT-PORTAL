const jwt = require("jsonwebtoken");
const secretKey = "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcwNjYyOTk0MSwiaWF0IjoxNzA2NjI5OTQxfQ.j1-U0NlilGG6u3BsPMvG3ZXfoHuotFoXI1KSkCZiA6g";

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(" ")[1];

    console.log("verifyToken: " + token);
  if (!token) {
    console.log("Token : " + token + "\nSecret Key: " + secretKey);
    console.log("verifytoken error 1: "  + res.status(401).json({ error: "Unauthorized" }));
    return res.status(401).json({ error: "Unauthorized" });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    console.log("Token : " + token + "\nSecret Key: " + secretKey);
    if (err) {
      console.log("verifytoken error 2: "  + res.status(401).json({ error: "Invalid token" }));
      return res.status(401).json({ error: "Invalid token" });
    }


    req.userId = decoded.userId;

    console.log("Token verified proceeding towards next()");
    next();
  });
};

module.exports = verifyToken;



// const jwt = require("jsonwebtoken");

// const secretKey = process.env.JWT_SECRET_KEY;

// const verifyToken = (req, res, next) => {
//   const authorizationHeader = req.headers.authorization;
//   if (!authorizationHeader) {
//     console.log(res.status(401).json({ error: "Unauthorized" }));
//     return res.status(401).json({ error: "Unauthorized" });
//   }

//   const token = authorizationHeader.split(" ")[1];
//   if (!token) {
//     console.log(res.status(401).json({ error: "Unauthorized" }));
//     return res.status(401).json({ error: "Unauthorized" });
//   }

//   jwt.verify(token, secretKey, (err, decoded) => {
//     if (err) {
//       console.log(res.status(401).json({ error: "Invalid token" }));
//       return res.status(401).json({ error: "Invalid token" });
//     }
//     console.log("Token verified");

//     // Store user ID and role in request object for further use
//     req.userId = decoded.userId;
//     req.userRole = decoded.userRole;
//     next();
//   });
// };

// module.exports = verifyToken;
