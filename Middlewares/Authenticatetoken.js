
const express = require('express')
const app = express();


const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  

  if (!token) return res.status(401).json({ message: "No token provided" });

  jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Token is invalid" });

    req.user = user;
    next();
  });
};

app.post("/email/send", authenticateToken, (req, res) => {
  // Email sending logic here
});
