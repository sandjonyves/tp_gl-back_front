require("dotenv").config();
const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
    const token = req.cookies.accessToken;
    
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }
    
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded,user) => {
        if (err) {
        return res.status(401).json({ message: "Invalid token" });
        }
        req.userId = decoded.id; 
        req.user = user;
        next(); 
    });
}

module.exports = authenticate;