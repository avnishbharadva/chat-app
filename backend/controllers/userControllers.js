const asyncHandler = require('express-async-handler');
const generateToken = require('../config/generateToken');
const User = require('../models/userModel')

const registerUser = asyncHandler(async (req, res) => {

    const { name, email, password, pic} = req.body;

    // check values of req.body
    if (!name || !email || !password){
        res.status(400);
        throw new Error("Please Enter All The Fields")
    }

    // check that user is already exist or not
    const userExists = await User.findOne({ email })

    if(userExists){
        res.status(400)
        throw new Error("User Already Exists")
    }

    // otherwise create new user
    const user = await User.create({ name, email, password, pic})

    if(user){
        
        // console.log(user)
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            password: user.password,
            pic: user.pic,
            token: generateToken(user._id),
        });
    } else {
        res.status(400)
        throw new Error("Failed to Create The User")
    }
    
});

const authUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body

    const user = await User.findOne({ email })

    if(user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            password: user.password,
            pic: user.pic,
            token: generateToken(user._id),
        })
    } else {
        res.status(401)
        throw new Error("Invalid Email or Password")
    }
})

module.exports = { registerUser, authUser }