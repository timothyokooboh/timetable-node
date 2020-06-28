
const User = require("../../models/User")
const joi = require("joi")
const bcryt = require("bcryptjs")

// validation schema for registration
const registrationSchema = joi.object().keys({
    email: joi.string().trim().email().required(),
    password: joi.string().trim().min(8).required()
})

const createUser =  async (req, res) => {
    // validate the request
    const {error} = joi.validate(req.body, registrationSchema)

    if (error) return res.status(400).send(error.details[0].message)

    // check if email already exists
    const emailExists = await User.findOne({email: req.body.email})

    if (emailExists) return res.status(400).send("Email already exists")

    // hash password
    const salt = await bcryt.genSalt(10)
    const hashedPassword = await bcryt.hash(req.body.password, salt)

    // pass the request into the model
    const user = User({
        email: req.body.email,
        password: hashedPassword
    })

    // save user in the database

    try {
        const savedUser = await user.save()
        res.send(savedUser)
    }
    catch (error) {
        res.status(400).send({message: error})
    }


}

module.exports.createUser = createUser