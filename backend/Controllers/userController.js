const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require('../Models/User');

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Enter all details!",
                success: false
            });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(404).json({
                message: "User already exists!",
                success: false
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        const userResponse = await newUser.save();

        const token = jwt.sign({ userId: userResponse._id }, process.env.JWT_KEY);

        res.status(200).json({
            message: "User created Successfully!",
            name: userResponse.name,
            token: token,
        });

    } catch (err) {
        console.log("Error : ", err);
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Enter all the credentials!",
                success: false
            });
        }

        const registeredUser = await User.findOne({ email });

        if (!registeredUser) {
            return res.status(404).json({
                message: "User Does not exist!",
                success: false
            });
        }

        const matchedPassword = await bcrypt.compare(password, registeredUser.password);

        if (!matchedPassword) {
            return res.status(400).json({
                message: "Unmatched Password!",
                success: false
            });
        }

        const token = await jwt.sign({ userId: registeredUser._id }, process.env.JWT_KEY);

        res.json({
            message: "User Logged in Successfully!",
            name: registeredUser.name,
            token: token
        });

    } catch (err) {
        console.log("Error: ", err);
    }
};

const logout = async (req, res) => {
    try {
        // Assuming the token is sent in the request header
        const token = req.header('Authorization').replace('Bearer ', '');

        if (!token) {
            return res.status(400).json({
                message: "Token not provided!",
                success: false
            });
        }

        // Here you would ideally invalidate the token
        // For example, you might use a token blacklist
        // or simply inform the client to delete the token

        // Respond with a successful logout message
        res.status(200).json({
            message: "User logged out successfully!",
            success: true
        });

    } catch (err) {
        console.log("Error: ", err);
        res.status(500).json({
            message: "Server error",
            errorMessage: err.message
        });
    }
};

const updateUser = async (req, res) => {
  try {
    const { name, email, oldPassword, newPassword } = req.body;
    const userId = req.body.userId;

    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized User!' });
    }

    const user = await User.findOne({ _id: userId });

    if (!user) {
        return res.status(401).json({ message: 'Unauthorized User!' });
    }

    // Update name if provided
    if (name) {
        user.name = name;
    }

    // Update email if provided and not already in use
    if (email) {
        if (email !== user.email) {
            const emailExists = await User.findOne({ email });
            if (emailExists) {
                return res.status(400).json({ message: 'Email already in use!' });
            }
            user.email = email;
        }
    }

    // Update password if both oldPassword and newPassword are provided
    if (oldPassword && newPassword) {
        const isPasswordValid = await bcrypt.compare(oldPassword, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid old password' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
    }

    await user.save();

    return res.status(200).json({
        message: 'User information updated successfully!',
        name: user.name,
        email: user.email
    });
} catch (error) {
    console.error('Error updating user:', error);
    return res.status(500).json({
        message: 'Server error',
        errorMessage: error.message
    });
}
};

module.exports = { register, login, logout, updateUser };
