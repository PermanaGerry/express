const jwt = require("jsonwebtoken");

const generadeTokens = (userInfo) => {
    const accessTokenExpiration = process.env.ACCESS_TOKEN_EXPIRATION || "15m"; // Default to 15 minutes
    const refreshTokenExpiration = process.env.REFRESH_TOKEN_EXPIRATION || "7d"; // Default to 7 days

    // generade an access token
    const accessToken = jwt.sign(
        {
            userInfo: {
                user: userInfo.email,
                userId: userInfo._id,
                roles: userInfo.roles
            }
        },
        process.env.SECRET_KEY,
        {expiresIn: accessTokenExpiration}
    );

    // generade a refresh token
    const refreshToken = jwt.sign(
        {
            userInfo: {
                user: userInfo.email,
                userId: userInfo._id,
                roles: userInfo.roles
            }
        },
        process.env.SECRET_KEY,
        {expiresIn: refreshTokenExpiration}
    );

    return {accessToken, refreshToken}
}

module.exports = {generadeTokens};