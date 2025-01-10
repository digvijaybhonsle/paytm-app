const { JWT_SECRET } = require("./config");
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    // Check if the Authorization header is provided and has the 'Bearer ' prefix
    if (!authHeader) {
        return res.status(403).json({
            message: "No token provided. Please include a Bearer token."
        });
    }

    if (!authHeader.startsWith('Bearer ')) {
        return res.status(403).json({
            message: "Invalid token format. Token should be in 'Bearer <token>' format."
        });
    }

    const token = authHeader.split(' ')[1]; // Extract token from header

    // Log the token for debugging purposes (optional, remove in production)
    console.log("Received token:", token);

    try {
        // Verify the token using the JWT_SECRET
        const decoded = jwt.verify(token, JWT_SECRET);

        // If token is valid, attach the userId to the request object
        if (decoded.userId) {
            req.userId = decoded.userId;
            next(); // Continue to the next middleware/route handler
        } else {
            return res.status(403).json({
                message: "Token is missing userId."
            });
        }
    } catch (err) {
        return res.status(401).json({
            message: "Invalid or expired token. Please provide a valid token.",
            error: err.message // Send error message for debugging
        });
    }
};

module.exports = {
    authMiddleware
};
