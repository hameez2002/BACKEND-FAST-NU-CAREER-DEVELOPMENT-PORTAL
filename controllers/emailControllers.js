const expressAsyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
dotenv.config();

const decryptPassword = (encryptedPassword) => {
  return Buffer.from(encryptedPassword, 'base64').toString('utf-8');
};

const sendEmail = expressAsyncHandler(async (req, res) => {
  const { email, subject, message, password } = req.body;
  console.log(email, subject, message,password);

  const decryptedPassword = decryptPassword(password);

  var mailOptions = {
    from: process.env.SMTP_MAIL,
    to: email,
    subject: subject,
    text: message,
  };

  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_MAIL,
      pass: decryptedPassword,
    },
  });

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.status(500).send("Error sending email");
    } else {
      console.log("Email sent successfully!");
      res.status(200).send("Email sent successfully");
    }
  });
});

module.exports = { sendEmail };