const jwtUtils = require('../utils/jwtUtils');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const dotenv = require("dotenv");

dotenv.config();

exports.register = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    
    const { email, username, password } = req.body;
    // Add detailed password logging
    console.log("Original password:", password);
    console.log("Password length:", password.length);
    // Validate input
    if (!email || !username || !password) {
      return res.status(400).json({ error: "Email, username, and password are required" });
    }
    //check if the user already exists
    const existingUser=await User.findOne({username});
    if(existingUser){
      return res.status(400).json({error:"Username already exists"});
    }
    console.log("Hashing password:", password);
    // Hash password
    const hashPassword = await bcrypt.hash(password, 10);
    console.log("Hashed password:", hashPassword);
    // Create user
    const user = new User({ email, username, password: hashPassword });
    await user.save();
    // Verify what was actually stored
    const savedUser = await User.findOne({username});
    console.log("Stored user data:", savedUser);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    
     console.log("Login attempt for:", username);
    console.log("Received password:", password, "Length:", password.length);
    //check if the username and password are provided
    if (!username || !password) {
      return res.status(401).json({ error: "Username and password are required" });
    }

    const user=await User.findOne({username});

    

    if(!user){
      console.log("❌ Username not found");
      return res.status(401).json({error:"Invalid username"});
    }
     console.log("Stored hash:", user.password);

     
    
    // Direct comparison with logging
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match result:", isMatch);
    if(!isMatch){
      // Additional debug - hash the input password with the same salt
      const salt = user.password.substring(0, 29); // Extract salt from stored hash
      const testHash = await bcrypt.hash(password, salt);
      console.log("Test hash with same salt:", testHash);
      console.log("Hash comparison:", testHash === user.password);
      
      return res.status(401).json({error:"Invalid username or password"});
    }
  

    // Generate tokens
    
    const accessToken = jwtUtils.generateAccessToken(user);
    const refreshToken = jwtUtils.generateRefreshToken(user);

    // Store refresh token in user's database record
    user.refreshTokens .push(refreshToken);
    await user.save();

    // Set refresh token as an HttpOnly cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    console.log("login successful, sending accesss token");

    res.json({ accessToken });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// // Function to generate access token
// const generateAccessToken = (user) => {
//   return jwt.sign(
//     { userId: user.id, username: user.username },
//     process.env.ACCESS_TOKEN_SECRET,
//     { expiresIn: '15m' }  // Expiry time for access token
//   );
// };

// Refresh token route
exports.refreshToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(403).json({ message: "Refresh token required" });
  }

  try {
    //find user with this refresh token
    const user = await User.findOne({ refreshTokens: refreshToken });
    if (!user) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }
   
    //verify the refresh token
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err) {
          return res.status(403).json({ message: "Invalid refresh token" });
        }

        const newAccessToken = jwtUtils.generateAccessToken(user);

        res.json({ accessToken: newAccessToken });
      }
    );
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(400).json({ message: "Refresh token not provided" });
  }

  try {
    const user = await User.findOne({ refreshTokens: refreshToken });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    // Remove refresh token
    user.refreshTokens = user.refreshTokens.filter((token) => token != refreshToken);
    await user.save();

    // Clear the refresh token cookie
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
    res.status(200).json({ message: "Logout successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};