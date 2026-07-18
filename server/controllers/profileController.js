const User = require("../models/User");

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
      user: {
        name: user.name || "User",
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const updateProfile = async (req, res) => {
  try {
    let { name, email } = req.body;

    // Remove unwanted spaces
    if (email) {
      email = email.trim();

      // Check duplicate email (exclude current user)
      const existingUser = await User.findOne({
        email: email,
        _id: { $ne: req.user.id },
      });

      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "Email already exists",
        });
      }
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, email },
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile Updated Successfully",
      user: {
        name: user.name,
        email: user.email,
      },
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