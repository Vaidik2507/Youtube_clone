import express from 'express';
import bcrypt from 'bcrypt';
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

        res.status(201).json({ message: 'User registered successfully.' });

    } catch (error) {
        res.status(500).json({ message: error.message});
    }
});

export default auth;