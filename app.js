// app.js
const express = require("express");
const mongoose = require("mongoose");
const emailRoutes = require("./routes/emailRoutes");
const errorHandler = require("./Middlewares/errorHandler");
const authRoutes = require("./routes/authRoutes")
const authMiddleware = require("./Middlewares/authMiddleware")
const{verifyAccessToken}=require('./utils/jwtUtils')
const bcrypt = require('bcryptjs');

require("dotenv").config();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser")
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));  
app.use(cookieParser());
// Allow requests from the frontend
app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend's URL
  credentials: true, // To allow cookies (JWT in cookies) to be sent with requests
}));
//app.use("/protected-route", verifyAccessToken, protectedController);


// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
   // useNewUrlParser: true,
   // useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

// Email routes
app.use("/email", emailRoutes);
//centeralized error handling middleware
// app.use(errorHandler);

app.use("/auth",authRoutes)
app.use('/login', authRoutes)
// app.post("/auth/login", (req, res) => {
//   const { username, password } = req.body;

//   // Authenticate user (dummy example)
//   const user = User.find((u) => u.username === username && u.password === password);
//   if (!user) return res.status(401).json({ message: "Invalid credentials" });

//   const accessToken = jwt.sign({ id: user.id }, "ACCESS_SECRET", {
//     expiresIn: "15m",
//   });
//   const refreshToken = jwt.sign({ id: user.id }, "REFRESH_SECRET", {
//     expiresIn: "7d",
//   });

//   refreshTokens.push(refreshToken); // Save the refreshToken somewhere (DB, in-memory, etc.)
//   res.json({ accessToken, refreshToken });
// });
// app.post("/api/auth/refresh", (req, res) => {
//   const { token } = req.body;

//   if (!token) {
//     return res.status(401).json({ message: "Refresh token missing" });
//   }

//   try {
//     const user = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

//     const accessToken = jwt.sign(
//       { id: user.id },
//       process.env.ACCESS_TOKEN_SECRET,
//       { expiresIn: "15m" }
//     );

//     res.json({ accessToken });
//   } catch (err) {
//     res.status(403).json({ message: "Invalid refresh token" });
//   }
// });
// ...existing code...
app.post('/test-bcrypt', async (req, res) => {
  const { plain, hash } = req.body;
  if (!plain || !hash) {
    return res.status(400).json({ error: "Both 'plain' and 'hash' fields are required." });
  }
  try {
    const result = await bcrypt.compare(plain, hash);
    res.json({ result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// ...existing code...




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
