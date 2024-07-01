const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
    try {
        const authHeader = req.header("Authorization");

        if (!authHeader) {
            return res.status(401).json({
                message: "Unauthorized user! No token provided."
            });
        }

        // Split the "Bearer <token>" format
        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                message: "Unauthorized user! Invalid token format."
            });
        }

        const verifiedToken = jwt.verify(token, process.env.JWT_KEY);

        if (!verifiedToken || !verifiedToken.userId) {
            return res.status(401).json({
                message: "Invalid token!"
            });
        }

        req.body.userId = verifiedToken.userId;

        next();
    } catch (error) {
        console.error("Error verifying token:", error);
        return res.status(401).json({
            message: "Invalid token!",
            errorMessage: error.message
        });
    }
};

module.exports = auth;
