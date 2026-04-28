const express = require("express")
const router = express.Router()
const { createTask, getTasks } = require("../controllers/taskcontroller")

router.post("/", auth, createTask)
router.get("/", auth, getTasks)

module.exports = router