const express = require("express");
const {
    verifyToken,
    isAuthorized,
    isAdmin,
} = require("../middleware/verifyToken");
const User = require("../models/User");

const router = express.Router();

router.put("/:id", verifyToken, isAuthorized, async (req, res) => {
    try {
        const { user } = req.body;
        console.log("user ", user)

        if (user.password) {
            user.password = await bcrypt.hash(user.password, 12);
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.id, user, {
            new: true,
        });
        res.status(201).send(updatedUser);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.delete("/:id", verifyToken, isAuthorized, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(201).json("User has been deleted");
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get("/find/:id", verifyToken, isAdmin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, ...info } = user._doc;
        res.status(201).json(info);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get("/", verifyToken, isAdmin, async (req, res) => {
    try {
        const query = req.query.new;
        const users = query
            ? await User.find().sort({ createdAt: -1 }).limit(5)
            : await User.find();
        res.status(201).json(users);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get("/stats", verifyToken, isAdmin, async (req, res) => {
    const today = new Date();
    const lastYear = new Date(today.setFullYear(today.getFullYear() - 1));
    try {
        const data = await User.aggregate([
            { $match: { createdAt: { $gte: lastYear } } },
            {
                $project: {
                    month: { $month: "$createdAt" }
                }
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 }
                }
            }, {
                $sort: {
                    _id: 1
                }
            }
        ])
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json(err)
    }
});

module.exports = router;
