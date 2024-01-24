const {mongooHealtCheck} = require("../config/mongooDB");
const asyncHandler = require("../middlewares/asyncHandler");

const aggregatorHealth = () => {
    return {
        mongoo: mongooHealtCheck()
    };
};

const serverStatus = asyncHandler((req, res, next) => {
    res.status(200).json({
        state: "up",
        service: aggregatorHealth()
    });
});

module.exports = {serverStatus};