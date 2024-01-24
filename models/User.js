const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        match: [
            /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
            "Plase enter valid email",
        ],
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
        select: true, // To exclude password from query results by default
    },
    roles: {
        type: Object,
        required: true,
    },
    passwordResetToke: String,
    passwordResetExpires: Date,
}, {
    timestamps: true, // Add createdAt and updatedAt fields
});

module.exports = new mongoose.model("user", userSchema) 