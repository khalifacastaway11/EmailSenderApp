
//Middleware/verifyAccessTokenMiddleware.js
const verifyAcessToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({message:"ntoken required"})
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded;
        next();

    }
    catch (error) {
        res.status(403).json({message:"Invalid or expired access token"})
    }
}