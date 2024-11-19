import { useEffect, useState } from 'react'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './component/Header'

export default function Home() {
  const [todos, setTodos] = useState([])
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [editingTodoId, setEditingTodoId] = useState(null)
  const [editedTitle, setEditedTitle] = useState('')

  const token = localStorage.getItem('token')

  const getTodos = async () => {
    setLoading(true)
    try {
      const res = await axios.get('http://localhost:5000/api/todos', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setTodos(res.data)
    } catch (error) {
      // toast.error('Error fetching todos. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getTodos()
  }, [token])

  const createNewTodo = async (e) => {
    e.preventDefault()
    if (content.length > 3) {
      setLoading(true)
      try {
        await axios.post(
          'http://localhost:5000/api/todos',
          { todo: content },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        setContent('')
        getTodos()
        toast.success('New todo created successfully!')
      } catch (error) {
        toast.error('Failed to create todo. Please try again.')
      } finally {
        setLoading(false)
      }
    } else {
      toast.warning('Todo content must be at least 4 characters long.')
    }
  }

  const updateTodo = async (todoId, todoStatus) => {
    try {
      const res = await axios.post(
        `http://localhost:5000/api/todos/done/${todoId}`,
        { status: todoStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      if (res.status === 200) {
        toast.success('Todo status updated successfully!')
        getTodos()
      }
    } catch (error) {
      toast.error('Failed to update todo status.')
    }
  }

  const updateTodoTitle = async (todoId, todoTitle) => {
    if (!todoTitle || todoTitle.trim() === '') {
      toast.warning('Todo title cannot be empty.')
      return
    }
    try {
      const res = await axios.post(
        `http://localhost:5000/api/todos/update/${todoId}`,
        { todo: todoTitle },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      if (res.status === 200) {
        toast.success('Todo title updated successfully!')
        setEditingTodoId(null)
        getTodos()
      }
    } catch (error) {
      toast.error('Failed to update todo title.')
    }
  }

  const deleteTodo = async (todoId) => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/todos/${todoId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (res.status === 200) {
        toast.success('Todo deleted successfully!')
        // Update the todos state to remove the deleted todo
        setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== todoId))
      }
    } catch (error) {
      toast.error('Failed to delete todo.')
    }
  }

  return (
    <>
      <Header />
      <main className='container mx-auto p-6 bg-gray-50 min-h-screen flex flex-col items-center'>
        <ToastContainer />
        <h1 className='text-4xl font-semibold text-center text-indigo-700 mb-6'>
          Awesome Todos
        </h1>

        {/* New Todo Form */}
        <form
          className='w-full max-w-lg bg-white p-6 rounded-lg shadow-md mb-8'
          onSubmit={createNewTodo}
        >
          <input
            type='text'
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder='Enter a new todo...'
            className='w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4'
            required
          />
          <button
            className='w-full bg-indigo-500 text-white p-4 rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500'
            type='submit'
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Todo'}
          </button>
        </form>

        {/* Todo List */}
        <div className='w-full max-w-lg'>
          {loading ? (
            <div className='text-center text-gray-600'>Loading todos...</div>
          ) : (
            <div className='space-y-4'>
              {todos.length > 0 ? (
                todos.map((todo) => (
                  <div
                    key={todo._id}
                    className='flex justify-between items-center p-4 bg-white shadow-md rounded-lg mb-4'
                  >
                    <div className='flex items-center space-x-4'>
                      {editingTodoId === todo._id ? (
                        <input
                          type='text'
                          value={editedTitle}
                          onChange={(e) => setEditedTitle(e.target.value)}
                          className='w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500'
                        />
                      ) : (
                        <p
                          className={`text-lg font-medium ${
                            todo.status
                              ? 'line-through text-gray-500'
                              : 'text-gray-700'
                          }`}
                        >
                          {todo.todo}
                        </p>
                      )}
                    </div>
                    <div className='flex space-x-2'>
                      <button
                        onClick={() => updateTodo(todo._id, todo.status)}
                        className={`px-3 py-1 rounded-lg focus:outline-none ${
                          todo.status
                            ? 'bg-green-500 hover:bg-green-600'
                            : 'bg-yellow-500 hover:bg-yellow-600'
                        } text-white`}
                      >
                        {todo.status ? '☑' : '☐'}
                      </button>

                      {editingTodoId === todo._id ? (
                        <button
                          onClick={() => updateTodoTitle(todo._id, editedTitle)}
                          className='px-3 py-1 rounded-lg bg-blue-500 hover:bg-blue-600 text-white'
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            setEditingTodoId(todo._id)
                            setEditedTitle(todo.todo)
                          }}
                          className='px-3 py-1 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white'
                        >
                          Edit
                        </button>
                      )}
                      <button
                        onClick={() => deleteTodo(todo._id)}
                        className='px-3 py-1 rounded-lg bg-red-500 hover:bg-red-600 text-white'
                      >
                        🗑
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className='text-center text-gray-600'>
                  No todos available.
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </>
  )
}
