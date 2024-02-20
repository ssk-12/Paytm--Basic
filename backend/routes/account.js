// backend/routes/account.js
const express = require('express');
// const express = require("express");
const app = express();
const { authMiddleware } = require('../middleware');
const { Account } = require('../db');
const { default: mongoose } = require('mongoose');
const z = require("zod");
const passport = require('passport');
const initializePassport = require('../passport');

app.use(passport.initialize());
initializePassport()

const router = express.Router();

router.get("/balance", passport.authenticate('jwt', { session: false }), async (req, res) => {
    const account = await Account.findOne({
        userId: req.user._id 
    });

    res.json({
        balance: account.balance
    });
});
  

router.post("/transfer", passport.authenticate('jwt', { session: false }), async (req, res) => {
    const session = await mongoose.startSession();
    console.log("/transfer");
    

    session.startTransaction();
    const userId = req.user._id;

    const { amount, to } = req.body;
    console.log(amount, to);

    // Fetch the accounts within the transaction
    const account = await Account.findOne({ userId: userId }).session(session);
    console.log("account",account);
    if(amount < 0){
        return res.json({
            message: "amt can't be negative"
        });
    }

    if (!account || account.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        });
    }


    const toAccount = await Account.findOne({ userId: to }).session(session);
    console.log(toAccount);

    if (!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account"
        });
    }

    // Perform the transfer
    await Account.updateOne({ userId: userId }, { $inc: { balance: -amount } }).session(session);
    await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

    // Commit the transaction
    await session.commitTransaction();
    res.json({
        message: "Transfer successful"
    });
});

module.exports = router;


// router.get("/balance", authMiddleware, async (req, res) => {
//     const account = await Account.findOne({
//         userId: req.userId
//     });

//     res.json({
//         balance: account.balance
//     })
// });

// router.get('/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
//     res.json({ message: 'This is a protected route!' });
// });