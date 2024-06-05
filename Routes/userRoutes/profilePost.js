const knex = require("../../knexFile.js");
const azure = require("azure-storage");
const fs = require('fs');
const blobService = azure.createBlobService("cdp3", "hzfOj//gM6C8mvt5xh0WkGuqYOp36lFLrR3TGiua/TxxdqMBNFxKfJjO9PVkoaUI9H4wV9duSOKF+AStYfNyKA==");

console.log("Entered Profile");

module.exports = async (req, res) => {
  try {
    const {
      user_id,
      fname,
      lname,
      year_of_graduation,
      discipline,
      contact,
      tagline,
      cgpa,
      personal_statement,
      certificates,
      experiences,
      profiles,
    } = req.body;

    console.log("req files: ", req.files[0]);
    const profilePic = req.files[0];
    console.log("profile pic: ", profilePic);
    const blobName = `profile-pics/${profilePic.originalname}`;
    const buffer = profilePic.buffer; // Access the buffer directly
    const containerName = "profilepic";
    console.log(blobName);
    
    await new Promise((resolve, reject) => {
      blobService.createBlockBlobFromText(containerName, blobName, buffer, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });

    const profilePicUrl = `https://cdp3.blob.core.windows.net/profilepic/${blobName}`;
    
    // Update database with profile picture URL and other profile data
    await knex.transaction(async (trx) => {
      await trx("student_profile")
        .where({ user_id })
        .update({
          fname,
          lname,
          student_profile_pic: profilePicUrl, // Update with profile picture URL
          year_of_graduation,
          discipline,
          contact,
          tagline,
          cgpa,
          personal_statement,
        });

      // Handle certificates if it's an array
      if (Array.isArray(certificates)) {
        await trx("certificates").where({ user_id }).del();
        await trx("certificates").insert(
          certificates.map((certificate) => ({
            user_id,
            certificate,
          }))
        );
      }
      



      // Handle experiences if it's an array
      if (Array.isArray(experiences)) {
        await trx("experiences").where({ user_id }).del();
        await trx("experiences").insert(
          experiences.map((experience) => ({
            user_id,
            experience,
          }))
        );
      }
      
      // Insert into profiles table if it's an array
      if (Array.isArray(profiles)) {
        await trx("profiles").insert(
          profiles.map((profile) => ({
            user_id,
            ...profile,
          }))
        );
      }
    });
    

    console.log("Profile data updated successfully");
    return res.status(200).json({ message: "Profile data updated successfully" });
  } catch (error) {
    console.error("Error updating profile data:", error);
    return res
      .status(500)
      .json({ error: "Failed to update profile data", details: error.message });
  }
};
