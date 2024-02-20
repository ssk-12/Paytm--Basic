// backend/routes/user.js
const express = require('express');

const router = express.Router();
const zod = require("zod");
const { User, Account } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middleware");

const signupBody = zod.object({
    username: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string()
})

router.post("/signup", async (req, res) => {
    const { success } = signupBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const existingUser = await User.findOne({
        username: req.body.username
    })

    if (existingUser) {
        return res.status(411).json({
            message: "Email already taken/Incorrect inputs"
        })
    }

    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    })
    const userId = user._id;

    await Account.create({
        userId,
        balance: 1 + Math.random() * 10000
    })

    // const token = jwt.sign({
    //     userId
    // }, JWT_SECRET);

    const payload = {
        sub: user._id, // Include the user ID in the payload
        username: user.username // You can include additional user information if needed
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
    

    res.json({
        message: "User created successfully",
        token: token,
        userid: user._id,
        firstName: user.firstName
    })
})


const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string()
})

router.post("/signin", async (req, res) => {
    const { success } = signinBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    });

    if (user) {
        // const token = jwt.sign({
        //     userId: user._id
        // }, JWT_SECRET);

        // res.json({
        //     token: token,
        //     userid : user._id,
        //     firstName: user.firstName
        // })

        // const token = jwt.sign({ sub: user._id }, JWT_SECRET, { expiresIn: '1h' });
        // res.json({ token });

        // Assuming you have a user object with an _id field representing the user ID
        const payload = {
            sub: user._id, // Include the user ID in the payload
            username: user.username // You can include additional user information if needed
        };

        // Generate JWT token
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
        console.log("sigin" , token);
        res.json({
            token: token,
            userid : user._id,
            firstName: user.firstName
        })


        return;
    }


    res.status(411).json({
        message: "Error while logging in"
    })
})

const updateBody = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
})

router.put("/", authMiddleware, async (req, res) => {
    const { success } = updateBody.safeParse(req.body)
    if (!success) {
        res.status(411).json({
            message: "Error while updating information"
        })
    }

    await User.updateOne(req.body, {
        id: req.userId
    })

    res.json({
        message: "Updated successfully"
    })
})

router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";
    const currentUserId = req.query.currentUserId;

    // const users = await User.find({
    //     $or: [
    //         { firstName: { "$regex": filter, "$options": "i" } },
    //         { lastName: { "$regex": filter, "$options": "i" } }
    //     ],
    //     ...currentUserId && { "_id": { $ne: currentUserId } }
    // })
    const users = await User.find({
        $and: [
            {
                $or: [
                    { firstName: { "$regex": filter, "$options": "i" } },
                    { lastName: { "$regex": filter, "$options": "i" } }
                ]
            },
            { "_id": { $ne: currentUserId } }
        ]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})


module.exports = router;