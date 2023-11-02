require("dotenv").config();
const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        const { user } = req.body;
        user.password = await bcrypt.hash(user.password, 12);
        const newUser = new User(user);
        await newUser.save();
        res.status(201).send(newUser);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            return res.status(500).json("Wrong User Name");
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (isMatch) {
            const payload = {
                id: user._id,
                isAdmin: user.isAdmin,
            };
            const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "3d",
            });
            const { password, ...others } = user._doc
            res.status(200).send({ accessToken, ...others });
        }
    } catch (error) {
        res.status(500).send(error);
    }
});
module.exports = router;
