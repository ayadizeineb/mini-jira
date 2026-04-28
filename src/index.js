require("dotenv").config()
const express = require("express")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

// routes
const authRoutes = require("./routes/authroutes")
app.use("/auth", authRoutes)

app.get("/", (req, res) => {
    res.send("API works 🚀")
})
const taskRoutes = require("./routes/taskroutes")

app.use("/tasks", taskRoutes)
app.listen(3000, () => {
    console.log("Server running on port 3000")
})