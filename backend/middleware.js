const { JWT_SECRET } = require("./config");
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            message: "No token provided. Please include a Bearer token."
        });
    }

    if (!authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            message: "Invalid token format. Token should be in 'Bearer <token>' format."
        });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        if (decoded.userId) {
            req.userId = decoded.userId;
            next();
        } else {
            return res.status(401).json({
                message: "Token is missing userId."
            });
        }
    } catch (err) {
        return res.status(401).json({
            message: "Invalid or expired token. Please provide a valid token.",
            error: err.message
        });
    }
};

module.exports = {
    authMiddleware
};
