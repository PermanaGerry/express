const ErrorResponse = require("../utils/errorResponse");
const jwt = require("jsonwebtoken");
const {userUnauthorizedAccess, userInvalidToken, notPermissionAccessAPI} = require("../utils/messages.json");

// middleware for verification user tokens
const verifyUserTokens = (req, res, next) => {
    let token;

    if (req.originSource === "Whitelisted Origin") {
        const authHeader = req.headers.authorization || req.headers.Authorization;
        if (!authHeader?.startsWith("Bearer")) {
            return next(new ErrorResponse(userUnauthorizedAccess, 401));
        }

        token = authHeader.split(" ")[1];
    } else {
        return next(new ErrorResponse(notPermissionAccessAPI, 403));
    }

    jwt.verify(token, process.env.SECRET_KEY, async (err, decode) => {
        if(err) {
            return next(new ErrorResponse(userInvalidToken, 401));
        }

        req.userId = decode.userId;
        req.user = decode.user;
        req.roles = decode.roles;

        next();
    });
};

module.exports = verifyUserTokens;
