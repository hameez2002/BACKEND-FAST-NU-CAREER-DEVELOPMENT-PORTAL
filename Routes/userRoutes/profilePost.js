//profilePost.js
const knex = require("../../knexFile.js");

console.log("Entered Profile");

module.exports = async (req, res) => {
  try {
    const {
      user_id,
      fname,
      lname,
      student_profile_pic,
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

    // Check if user_id is provided
    // if (!user_id) {
    //   return res.status(400).json({ error: "User ID is required" });
    // }

    // Decode base64 profile picture string
    // const buffer = Buffer.from(profilePicture, "base64");

    // Start transaction
    await knex.transaction(async (trx) => {
      // Update student_profile table
      await trx("student_profile")
        .where({ user_id })
        .update({
          fname,
          lname,
          student_profile_pic,
          year_of_graduation,
          discipline,
          contact,
          tagline,
          cgpa,
          personal_statement,
          // student_profile_pic: buffer,
        });

      // Handle certificates
      if (certificates && certificates.length > 0) {
        // Delete existing certificates
        await trx("certificates").where({ user_id }).del();

        // Insert new certificates
        await trx("certificates").insert(
          certificates.map((certificate) => ({
            user_id,
            certificate,
          }))
        );
      }

      // Handle experiences
      if (experiences && experiences.length > 0) {
        // Delete existing experiences
        await trx("experiences").where({ user_id }).del();

        // Insert new experiences
        await trx("experiences").insert(
          experiences.map((experience) => ({
            user_id,
            experience,
          }))
        );
      }

      // Insert into profiles table
      if (profiles && profiles.length > 0) {
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


