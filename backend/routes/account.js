// backend/routes/account.js
const express = require('express');
const mongoose = require('mongoose');
const { authMiddleware } = require('../middleware');
const { Account } = require('../db');


const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
    try {
        // Find the account by userId
        const account = await Account.findOne({ userId: req.userId });

        // Check if account exists
        if (!account) {
            return res.status(404).json({
                message: "Account not found"
            });
        }

        // Respond with the balance
        res.json({
            balance: account.balance
        });
    } catch (error) {
        // Handle any unexpected errors
        res.status(500).json({
            message: "An error occurred while retrieving the balance",
            error: error.message
        });
    }
});

module.exports = router;

router.post("/transfer", authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { amount, to } = req.body;

        // Fetch the sender's account within the transaction
        const account = await Account.findOne({ userId: req.userId }).session(session);

        // Check if sender's account exists and has sufficient balance
        if (!account || account.balance < amount) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Insufficient balance"
            });
        }

        // Fetch the recipient's account within the transaction
        const toAccount = await Account.findOne({ userId: to }).session(session);

        // Check if recipient's account exists
        if (!toAccount) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Invalid recipient account"
            });
        }

        // Perform the transfer
        await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
        await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

        // Commit the transaction
        await session.commitTransaction();

        res.json({
            message: "Transfer successful"
        });
    } catch (error) {
        // Rollback the transaction in case of any error
        await session.abortTransaction();
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    } finally {
        session.endSession();
    }
});


module.exports = router;