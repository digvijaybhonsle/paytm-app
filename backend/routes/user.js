const express = require('express');
const zod = require('zod');
const jwt = require('jsonwebtoken');
const { User } = require('../db');
const { JWT_SECRET } = require('../config');
const { authMiddleware } = require('../middleware');

const router = express.Router();

// Schema for signup body validation
const signupBody = zod.object({
    username: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string()
});

// Signup endpoint
router.post('/signup', async (req, res) => {
    const { success, error } = signupBody.safeParse(req.body);
    if (!success) {
        return res.status(400).json({
            message: "Invalid input data",
            errors: error.errors
        });
    }

    try {
        const existingUser = await User.findOne({ username: req.body.username });
        if (existingUser) {
            return res.status(409).json({
                message: "Email already taken"
            });
        }

        const user = await User.create(req.body);
        const token = jwt.sign({ userId: user._id }, JWT_SECRET);

        res.status(201).json({
            message: "User created successfully",
            token
        });
    } catch (err) {
        res.status(500).json({
            message: "Internal server error",
            error: err.message
        });
    }
});

// Schema for signin body validation
const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string()
});

// Signin endpoint
router.post('/signin', async (req, res) => {
    const { success, error } = signinBody.safeParse(req.body);
    if (!success) {
        return res.status(400).json({
            message: "Invalid input data",
            errors: error.errors
        });
    }

    try {
        const user = await User.findOne({
            username: req.body.username,
            password: req.body.password
        });

        if (user) {
            const token = jwt.sign({ userId: user._id }, JWT_SECRET);
            return res.status(200).json({
                message: "Signin successful",
                token
            });
        }

        res.status(401).json({
            message: "Invalid username or password"
        });
    } catch (err) {
        res.status(500).json({
            message: "Internal server error",
            error: err.message
        });
    }
});

// Schema for update body validation
const updateBody = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
});

// Update user endpoint
router.put('/', authMiddleware, async (req, res) => {
    const { success, error } = updateBody.safeParse(req.body);
    if (!success) {
        return res.status(400).json({
            message: "Invalid input data",
            errors: error.errors
        });
    }

    try {
        await User.updateOne({ _id: req.userId }, req.body);
        res.status(200).json({
            message: "User updated successfully"
        });
    } catch (err) {
        res.status(500).json({
            message: "Internal server error",
            error: err.message
        });
    }
});

// Bulk get users endpoint
router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    try {
        const users = await User.find({
            $or: [{
                firstName: {
                    "$regex": filter,
                    "$options": "i"  // Case-insensitive search
                }
            }, {
                lastName: {
                    "$regex": filter,
                    "$options": "i"  // Case-insensitive search
                }
            }]
        });

        res.json({
            users: users.map(user => ({
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                _id: user._id
            }))
        });
    } catch (err) {
        res.status(500).json({
            message: "Error fetching users",
            error: err.message
        });
    }
});

module.exports = router;
