const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");
const asyncHandler = require("../middlewares/asyncHandler");
const bcrypt = require("bcryptjs");
const ROLES_LIST = require("../utils/roleList");
const {
    userRegistrationSuccessfulMessage,
    userAlreadyExistsMessage,
    userNotFoundMessage,
    incorrectPasswordMessage,
    loginSuccessfulMessage
} = require("../utils/messages.json");
const {generadeTokens} = require("../utils/generadeToken")

// Controller user register
const registerUser = asyncHandler(async (req, res, next) => {
    const {name, email, password} = req.body;
    
    let user = await User.findOne({email});
    if (user) return next(new ErrorResponse(userAlreadyExistsMessage, 409));
    
    // Create user 
    const newUser = new User({
        name,
        email,
        password: await bcrypt.hash(password, 10),
        roles: {
            USER: ROLES_LIST.USER
        }
    });

    user = await newUser.save();
    res.status(201).json({
        success: true,
        data: {
        message: userRegistrationSuccessfulMessage
        }
    });
});

// Controller user login
const loginUser = asyncHandler(async (req, res, next) => {
    const {email, password} = req.body;
    
    try {
        const user = await User.findOne({email})
        if (!user) {
            return next(new ErrorResponse(userNotFoundMessage, 404));
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return next(new ErrorResponse(incorrectPasswordMessage, 401)); 
        }
        
        const token = generadeTokens(user);
        res.status(201).json({
            status: true,
            data: {
                message: loginSuccessfulMessage,
                accessToken : token.accessToken,
                refreshToken: token.refreshToken
            }
        });
    } catch (err) {
        next(err);
    }
});

// controller detail user login
const detailUser = asyncHandler(async (req, res, next) => {
    const user = await User.findOne(req.user)
    if(!user) {
        return next(new ErrorResponse(userNotFoundMessage, 404));
    }

    res.status(200).json({
        status: true,
        data: {
            name: user.name,
            email: user.email
        }
    })
})

module.exports = {registerUser, loginUser, detailUser};