const prisma = require("../prisma/client")

// CREATE TASK
exports.createTask = async (req, res) => {
  try {
    const { title } = req.body;
    const userId = req.user.userId;
    const task = await prisma.task.create({
      data: { title, userId }
    });
    res.json(task);
  } catch (err) {
    console.error("Create Task Error:", err);
    res.status(500).json({ error: "create task error" });
  }
}


// GET TASKS
exports.getTasks = async (req, res) => {
  try {
    const userId = req.user.userId;
    const tasks = await prisma.task.findMany({
      where: { userId: Number(userId) }
    });
    res.json(tasks);
  } catch (err) {
    console.error("Get Tasks Error:", err);
    res.status(500).json({ error: "get tasks error" });
  }
}


// UPDATE STATUS
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params
    const { status } = req.body

    const task = await prisma.task.update({
      where: { id: Number(id) },
      data: { status }
    })

    res.json(task)

  } catch (err) {
    console.error("Update Task Error:", err)
    res.status(500).json({ error: "update error" })
  }
}


// DELETE TASK
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params

    await prisma.task.delete({
      where: { id: Number(id) }
    })

    res.json({ message: "deleted" })

  } catch (err) {
    console.error("Delete Task Error:", err)
    res.status(500).json({ error: "delete error" })
  }
}
