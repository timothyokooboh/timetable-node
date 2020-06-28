// import packages
const express = require("express")
const mongoose = require("mongoose")
require("dotenv/config")
const cors = require("cors")

// Initialize application with express
const app = express()

// Parse users input to req.body
app.use(express.json())
app.use(express.urlencoded({extended:false}))


// Set cors options for front end connection
const corsOptions = {
    origin: "http://localhost:8081"
}

app.use(cors(corsOptions))

const authRoutes = require("./routes/authRoutes")

// routes middleware for authentication
 app.use("/api/user", authRoutes)

// create database connection
mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
        console.log("connected to db")
    }
)

// create port

app.listen(process.env.PORT, () => {
    console.log("application is running on " + process.env.PORT)
})
