import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../model/user.js';

const auth = express.Router();

auth.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        console.log('request received', req.body);
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists.' });
        }

        const salt = await bcrypt.genSalt(8);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();

        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1d" });

        res.status(201).json({
            message: 'User registered successfully.',
            token: token
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

auth.post('/login', async (req, res) => {

    try {
        const { email, password } = req.body;
        const token = req.cookies?.token;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: "USER DOESN'T EXIST",
            });
        }

        const userPassword = user.password;
        const checkPassword = await bcrypt.compare(password, userPassword);

        if (checkPassword) {
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
                expiresIn: "7d"
            });
            res
                .cookie("token", token, {
                    httpOnly: false,
                    sameSite: "None",
                    secure: true,
                    maxAge: 24 * 60 * 60 * 1000,
                })
                .status(200).json({
                    message: "LOGIN SUCCESSFUL",
                });
            return res;
        } else {
            return res.status(401).json({
                message: "INVALID CREDENTIALS",
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message,
        })
    }
})

export default auth;