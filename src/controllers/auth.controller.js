const bcrypt = require('bcrypt');
const User = require('../models/user.model')
const saltRounds = 10;

exports.signup = async (req, res, next) => {
    try {
        const {name, username, password} = req.body;
        const usernameRegex = /^[a-zA-Z0-9_]+$/;

        if (!usernameRegex.test(username)) {
            return res.status(400).json({
                success: false,
                message: "Username can only contain letters, numbers, and underscores. Spaces are not allowed."
            });
        }
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const payload = {
            name,
            username,
            password: hashedPassword,
        }
        const newUser = new User(payload)
        await newUser.save();
        return res.status(201).json({
            success: true,
            message: 'Account created successfully'
        })
    } catch (e) {
        next(e)
    }
}