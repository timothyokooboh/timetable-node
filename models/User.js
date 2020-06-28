/**
 * Here, I defined the fields for the User model (more like a users table in sql) 
 * 
 * The User model will appear on the database with two fields: email address and password
 * 
 * It will be used for sign up and login
 */

const mongoose = require("mongoose")

const userSchema = mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
            min: 8
        }, 
    },

    {timestamps: true}

)

module.exports = mongoose.model("User", userSchema)