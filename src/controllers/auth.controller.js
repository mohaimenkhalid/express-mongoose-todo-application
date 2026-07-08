
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
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

exports.signIn = async (req, res, next) => {
    try {
        const {username, password} = req.body;
        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: "Username and password are required."
            });
        }
        const user = await User.findOne({username}).select("+password");
        if(!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid username or password"
            })
        }
        const isValidPassword = await bcrypt.compare(password, user.password)
        if (!isValidPassword) {
            return res.status(401).json({
                success: false,
                message: "Invalid username or password"
            })
        }

        if (user.status === "inactive") {
            return res.status(403).json({
                success: false,
                message: "Your account is inactive."
            });
        }

        const token = jwt.sign({
            userId: user._id,
            name: user.name,
            username: user.username
        }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN })

        return res.status(200).json({
            success: true,
            access_token: token,
            message: "Login successful!"
        })
    } catch (e) {
        next(e)
    }
}