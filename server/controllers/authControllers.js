const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const registerUser = async (req, res) => {
  try {

    // Get data from request body
    const { name, email, password } = req.body;

    // ✅ 1. Check empty fields
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // ✅ 2. Check email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    // ✅ 3. Check duplicate email
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }
// hashedPassword
    const hashedPassword = await bcrypt.hash(password, 10);
    // ✅ 4. Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });


    res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      user,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



const loginUser = async (req, res) => {
const { email, password } = req.body;
if (!email || !password) {
    return res.status(400).json({
        success: false,
        message: "Email and Password are required"
    });
}
const user = await User.findOne({ email });
if (!user) {
    return res.status(404).json({
        success: false,
        message: "User not found"
    });
}

const isMatch = await bcrypt.compare(password, user.password);
if (!isMatch) {
    return res.status(400).json({
        success: false,
        message: "Invalid credentials"
    });
}const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
);

return res.status(200).json({
  success: true,
  message: "Login Successful",
  token,
  user: {
    _id: user._id,
    name: user.name,
    email: user.email,
  },
});
}

const getProfile = async (req,res)=>{

    const userId = req.user.id;

    const user = await User.findById(userId)
    .select("-password");

    return res.status(200).json({

        success:true,

        user

    });

};
module.exports = {registerUser,loginUser,getProfile};