const { User } = require("../Schema/user.schema");

const upload_picture = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const userId = req.user.id;
    const imageUrl = `/uploads/${req.user.username}`;

    const user = await User.findByIdAndUpdate(
      userId,
      { profilePicture: imageUrl },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      message: "Profile picture uploaded successfully",
      profilePicture: imageUrl,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { upload_picture };
