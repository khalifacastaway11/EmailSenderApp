//utils/jwtutils.js
const jwt = require("jsonwebtoken");

//generate access token
const generateAccessToken = (user) => {
    return jwt.sign({ userId: user.id, username: user.username }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "15m",
    })
}

//generate refresh token
const generateRefreshToken = (user) => {
    return jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "7d",
    });
}

module.exports={
    generateAccessToken,
    generateRefreshToken,
};