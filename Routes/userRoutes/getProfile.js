const knex = require("../../knexFile.js");

module.exports = async (req, res) => {
  try {
    const { user_id } = req.params;

    // Check if user_id is provided and validate it if necessary
    if (!user_id) {
      return res.status(400).json({ error: "User ID is required" });
    }

    // Retrieve profile data, certificates, and experiences in a single query
    const [profile, certificates, experiences] = await Promise.all([
      knex("student_profile").select("*").where({ user_id }).first(),
      knex("certificates").select("certificate").where({ user_id }),
      knex("experiences").select("experience").where({ user_id }),
    ]);

    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }

    return res.status(200).json({ profile, certificates, experiences });
  } catch (error) {
    console.error("Error fetching profile data:", error);
    return res
      .status(500)
      .json({ error: "Failed to fetch profile data", details: error.message });
  }
};


