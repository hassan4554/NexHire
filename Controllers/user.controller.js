const { User } = require("../Schema/user.schema");
const { passwordUpdate, deleteProfilePhoto } = require("../Service/user.service");

// const upload_picture = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ error: "No file uploaded" });
//     }

//     const userId = req.user.id;
//     const imageUrl = `/uploads/${req.user.username}`;

//     const user = await User.findByIdAndUpdate(
//       userId,
//       { profilePicture: imageUrl },
//       { new: true }
//     );

//     if (!user) {
//       return res.status(404).send({
//         message: null,
//         profilePicture: null,
//         error: "User not found",
//       });
//     }

//     res.status(200).json({
//       message: "Profile picture uploaded successfully",
//       profilePicture: imageUrl,
//       error: null,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: null,
//       profilePicture: null,
//       error: "Server Error!",
//     });
//   }
// };
const update_profile = async (req, res) => {
  try {
    const userId = req.user._id;
    const restrictedFields = [
      "_id",
      "password",
      "profilePicture",
      "isEnabled",
      "username",
    ];

    const updates = req.body;
    const allowedUpdates = Object.keys(updates).reduce((acc, key) => {
      if (!restrictedFields.includes(key)) {
        acc[key] = updates[key];
      }
      return acc;
    }, {});

    let imageUrl = null;
    if (req.file) {
      imageUrl = `/uploads/${req.user.username}`;
      allowedUpdates.profilePicture = imageUrl;
    }

    if (Object.keys(allowedUpdates).length === 0) {
      return res.status(400).json({
        message: null,
        data: null,
        error: "No valid data provided for update",
      });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: allowedUpdates },
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        message: null,
        data: null,
        error: "User not found",
      });
    }
    res.status(200).json({
      message: "Profile updated successfully",
      data: user,
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      message: null,
      data: null,
      error: "Server Error!",
    });
  }
};

const delete_user = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.user._id);
    if (!user)
      return res.status(404).send({ message: null, error: "User not found" });

    await deleteProfilePhoto(user)

    return res.status(200).send({
      message: "User deleted successfully",
      error: null,
    });
  } catch (error) {
    return res.status(500).send({
      message: null,
      error: "Server Error!",
    });
  }
};

const update_password = async (req, res) => {
  try {
    const { status, message, error } = await passwordUpdate(
      req.user._id,
      req.body.password,
      req.body.newPassword
    );

    return res.status(status).send({
      message,
      error,
    });
  } catch (error) {
    return res.status(500).send({
      message: null,
      error: "Internal Server Error!",
    });
  }
};
module.exports = { update_profile, delete_user, update_password };
