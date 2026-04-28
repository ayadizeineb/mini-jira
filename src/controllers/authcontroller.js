const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const prisma = require("../prisma/client")

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, password: hashed }
    });
    res.json(user);
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ error: "register error" });
  }
};
    const user = await prisma.user.findUnique({
        where: { email }
    })

    if (!user) {
        return res.status(400).json({ error: "user not found" })
    }

    const valid = await bcrypt.compare(password, user.password)

    if (!valid) {
        return res.status(400).json({ error: "wrong password" })
    }

    // 🔥 CREATE TOKEN
    const token = jwt.sign(
        { userId: user.id },
        "secret123",
        { expiresIn: "1d" }
    )

    res.json({ token })
}