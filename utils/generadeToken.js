const jwt = require("jsonwebtoken");

const generadeTokens = (userInfo) => {
    const accessTokenExpiration = process.env.ACCESS_TOKEN_EXPIRATION || "15m"; // Default to 15 minutes
    const refreshTokenExpiration = process.env.REFRESH_TOKEN_EXPIRATION || "7d"; // Default to 7 days
    const secretToken = process.env.SECRET_KEY;

    // generade an access token
    const accessToken = jwt.sign(
        {
            userInfo: {
                user: userInfo.email,
                userId: userInfo._id,
                roles: userInfo.roles
            }
        },
        secretToken,
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
        secretToken,
        {expiresIn: refreshTokenExpiration}
    );

    return {accessToken, refreshToken}
}

module.exports = {generadeTokens};