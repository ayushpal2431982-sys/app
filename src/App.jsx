import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { FaEdit } from 'react-icons/fa'
import { AiFillDelete } from 'react-icons/ai'
import { v4 as uuidv4 } from 'uuid'

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [showFinished, setShowFinished] = useState(true)

  // ✅ Load todos from localStorage on first render
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos"))
    if (savedTodos && savedTodos.length > 0) {
      setTodos(savedTodos)
    }
  }, [])

  // ✅ Auto-save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  // ✅ Toggle "show finished" checkbox
  const toggleFinished = () => {
    setShowFinished(!showFinished)
  }

  // ✅ Add or Update Todo
  const handleAdd = () => {
    if (todo.trim() === "") return

    if (editingId) {
      // Update existing todo
      const updatedTodos = todos.map(item =>
        item.id === editingId ? { ...item, todo } : item
      )
      setTodos(updatedTodos)
      setEditingId(null)
    } else {
      // Add new todo
      const newTodo = { id: uuidv4(), todo, isCompleted: false }
      setTodos([...todos, newTodo])
    }

    setTodo("")
  }

  // ✅ Edit Todo
  const handleEdit = (id) => {
    const t = todos.find(i => i.id === id)
    setTodo(t.todo)
    setEditingId(id)
  }

  // ✅ Delete Todo
  const handleDelete = (id) => {
    const newTodos = todos.filter(item => item.id !== id)
    setTodos(newTodos)
  }

  // ✅ Checkbox toggle
  const handleCheckbox = (e) => {
    const id = e.target.name
    const newTodos = todos.map(item =>
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    )
    setTodos(newTodos)
  }

  // ✅ Input change
  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-5 rounded-xl p-5 bg-orange-200 min-h-[80vh] w-3/4 md:w-1/2">
        <h1 className="font-bold text-center text-xl mb-4">
          iTask - Manage your todos at one place
        </h1>

        {/* ✅ Add Todo Section */}
        <div className="addTodo my-5 flex flex-col gap-3">
          <h2 className="text-lg font-bold">Add a Todo</h2>
          <div className="flex gap-3">
            <input
              onChange={handleChange}
              value={todo}
              type="text"
              className="flex-1 border rounded-full px-3 py-2"
              placeholder="Enter your todo..."
            />
            <button
              onClick={handleAdd}
              className="bg-violet-800 hover:bg-violet-950 px-4 py-2 text-sm font-bold text-white rounded-full"
            >
              {editingId ? "Update" : "Save"}
            </button>
          </div>
        </div>

        {/* ✅ Toggle Finished Filter */}
        <div className="my-3">
          <input
            onChange={toggleFinished}
            type="checkbox"
            checked={showFinished}
            className="mr-2"
          />
          Show Finished
        </div>

        {/* ✅ Todo List */}
        <h2 className="text-lg font-bold">Your Todos</h2>
        <div className="todos mt-3">
          {todos.length === 0 && <div className="m-5">No todos to display</div>}

          {todos
            .filter(item => showFinished || !item.isCompleted)
            .map(item => (
              <div
                key={item.id}
                className="todo flex justify-between items-center bg-white shadow-md rounded-lg px-4 py-2 my-2"
              >
                <div className="flex items-center gap-3">
                  <input
                    name={item.id}
                    onChange={handleCheckbox}
                    type="checkbox"
                    checked={item.isCompleted}
                    className="w-4 h-4"
                  />
                  <span className={item.isCompleted ? "line-through text-gray-500" : ""}>
                    {item.todo}
                  </span>
                </div>
                <div className="buttons flex items-center gap-2">
                  <button
                    onClick={() => handleEdit(item.id)}
                    className="text-yellow-600 hover:text-yellow-700"
                    title="Edit"
                  >
                    <FaEdit size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-600 hover:text-red-700"
                    title="Delete"
                  >
                    <AiFillDelete size={20} />
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  )
}

export default App
