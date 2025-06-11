//Middlewares.authMiddleware.js
const jwt = require("jsonwebtoken")
const {verifyAccessToken}=require("../utils/jwtUtils")

const authMiddleware = (req, res,next) => {
    const token = req.cookies.token;
    if (!token) return res.status(403).json({ error: "Authorization token is required" })
    
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: "Invalid token" })
        req.user = user;
        next()
    })
}
module.exports = authMiddleware;