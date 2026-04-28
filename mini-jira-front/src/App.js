import { useState, useEffect } from "react"

function App() {
  // AUTH
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)

  // TASKS
  const [task, setTask] = useState("")
  const [tasks, setTasks] = useState([])

  // ---------------- LOGIN ----------------
  const login = async () => {
    const res = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    })

    const data = await res.json()

    if (data.token) {
      localStorage.setItem("token", data.token)
      setUser(true)
      loadTasks()
    }
  }

  // ---------------- LOAD TASKS ----------------
  const loadTasks = async () => {
    const token = localStorage.getItem("token")

    const res = await fetch("http://localhost:3000/tasks", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const data = await res.json()
    setTasks(data)
  }

  // ---------------- ADD TASK ----------------
  const addTask = async () => {
    if (!task) return

    const token = localStorage.getItem("token")

    const res = await fetch("http://localhost:3000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ title: task })
    })

    const data = await res.json()

    setTasks([...tasks, data])
    setTask("")
  }

  // ---------------- LOGOUT ----------------
  const logout = () => {
    localStorage.removeItem("token")
    setUser(null)
    setTasks([])
  }

  // ---------------- AUTO LOGIN ----------------
  useEffect(() => {
    const token = localStorage.getItem("token")

    if (token) {
      setUser(true)
      loadTasks()
    }
  }, [])

  // ---------------- LOGIN PAGE ----------------
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-md w-96">
          <h1 className="text-2xl font-bold text-center mb-6">
            Mini Jira Login 🔐
          </h1>

          <input
            className="w-full border p-3 rounded-lg mb-4"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="w-full border p-3 rounded-lg mb-4"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={login}
            className="w-full bg-blue-500 text-white p-3 rounded-lg"
          >
            Login
          </button>
        </div>
      </div>
    )
  }

  // ---------------- DASHBOARD ----------------
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md">

        <h1 className="text-2xl font-bold mb-4">🔥 Dashboard</h1>

        {/* ADD TASK */}
        <div className="flex gap-2 mb-4">
          <input
            className="border p-2 flex-1 rounded"
            placeholder="New task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />

          <button
            onClick={addTask}
            className="bg-green-500 text-white px-4 rounded"
          >
            Add
          </button>
        </div>

        {/* TASK LIST */}
        {tasks.map((t) => (
          <div
            key={t.id}
            className="p-3 border rounded mb-2 bg-gray-50"
          >
            {t.title}
          </div>
        ))}

        {/* LOGOUT */}
        <button
          onClick={logout}
          className="mt-4 w-full bg-red-500 text-white p-2 rounded"
        >
          Logout
        </button>

      </div>
    </div>
  )
}

export default App