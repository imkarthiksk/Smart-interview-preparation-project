const User = require("../models/User");

// Get Profile
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Profile
const updateProfile = async (req, res) => {
  try {

    const { name, email } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
       });
    }

    user.name = name || user.name;
    user.email = email || user.email;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = {
  getProfile,
  updateProfile,
};