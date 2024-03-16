// backend/profileGetAll.js

const knex = require("../../knexFile.js");

module.exports = async (req, res) => {
  try {
    // Fetch all profiles from the database
    const profiles = await knex("student_profile").select("*").orderBy("user_id");

    return res.status(200).json(profiles);
  } catch (error) {
    console.error("Error fetching profiles:", error);
    return res.status(500).json({ error: "Failed to fetch profiles", details: error.message });
  }
};
