const joi = require("joi")
const User = require("../../models/User")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

// schema for validating request
const loginSchema = joi.object().keys({
    email: joi.string().trim().email().required(),
    password: joi.string().trim().min(8).required()
})

const loginUser = async (req, res) => {
    // validate request
    const {error} = joi.validate(req.body, loginSchema)

    if(error) return res.status(400).send(error.details[0].message)

    // check if user exists
    const user = await User.findOne({email: req.body.email})

    if(!user) return res.status(401).send("Not registered")

    // check if password matches with the password in the database
    const validPassword = await bcrypt.compare(req.body.password, user.password)

    if(!validPassword) return res.status(400).send("invalid password")

    // create token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)

    res.header("auth-token", token).send({userToken: token})

}

module.exports.loginUser = loginUser