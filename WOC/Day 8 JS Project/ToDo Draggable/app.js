// Load tasks from localStorage on page load
window.onload = () => {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || {}
  for (const [id, taskData] of Object.entries(tasks)) {
    renderTask(id, taskData.text, taskData.column)
  }
}

// Add a new task
function addTask() {
  const taskInput = document.getElementById('taskInput')
  const taskText = taskInput.value.trim()

  if (taskText !== '') {
    const taskId = 'task-' + new Date().getTime()
    renderTask(taskId, taskText, 'todo')
    saveTask(taskId, taskText, 'todo')
    taskInput.value = '' // Clear the input field
  }
}

// Render a task to the UI
function renderTask(taskId, taskText, column) {
  const task = document.createElement('div')
  task.classList.add(
    'task',
    'border-2',
    'p-4',
    'rounded-md',
    'flex',
    'justify-between',
    'items-start',
    'cursor-pointer'
  )
  task.setAttribute('id', taskId)
  task.setAttribute('draggable', 'true')
  task.setAttribute('ondragstart', 'drag(event)')

  // Set border color based on column
  if (column === 'todo') task.classList.add('border-blue-500')
  else if (column === 'inprogress') task.classList.add('border-yellow-500')
  else if (column === 'done') task.classList.add('border-green-500')
  else if (column === 'backlog') task.classList.add('border-red-500')

  // Task content
  const taskContent = document.createElement('span')
  taskContent.classList.add('task-content', 'text-white', 'max-w-[80%]')
  taskContent.textContent = taskText
  task.appendChild(taskContent)

  // Delete button
  const deleteButton = document.createElement('button')
  deleteButton.textContent = 'X'
  deleteButton.classList.add(
    'delete-button',
    'bg-red-500',
    'text-white',
    'px-2',
    'py-1',
    'rounded-md',
    'ml-2'
  )
  deleteButton.addEventListener('click', () => {
    task.remove()
    removeTask(taskId)
  })
  task.appendChild(deleteButton)

  // Append task to the specified column
  document.getElementById(`${column}-list`).appendChild(task)
}

// Save a task to localStorage
function saveTask(id, text, column) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || {}
  tasks[id] = { text, column }
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

// Remove a task from localStorage
function removeTask(id) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || {}
  delete tasks[id]
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

// Drag and Drop Functions
function drag(event) {
  event.dataTransfer.setData('text', event.target.id)
}

function allowDrop(event) {
  event.preventDefault()
  event.stopPropagation()
}

function drop(event) {
  event.preventDefault()
  event.stopPropagation()

  const targetColumn = event.target.closest('div') // Ensure drop is on a column
  const taskId = event.dataTransfer.getData('text')
  const draggedTask = document.getElementById(taskId)

  if (draggedTask) {
    if (targetColumn.id === 'todo') {
      updateTaskColumn(draggedTask, taskId, 'todo', 'border-blue-500')
    } else if (targetColumn.id === 'inprogress') {
      updateTaskColumn(draggedTask, taskId, 'inprogress', 'border-yellow-500')
    } else if (targetColumn.id === 'done') {
      updateTaskColumn(draggedTask, taskId, 'done', 'border-green-500')
    } else if (targetColumn.id === 'backlog') {
      updateTaskColumn(draggedTask, taskId, 'backlog', 'border-red-500')
    }
  }
}

// Update a task's column and style
function updateTaskColumn(task, taskId, column, borderColorClass) {
  task.classList.remove(
    'border-blue-500',
    'border-yellow-500',
    'border-green-500',
    'border-red-500'
  )
  task.classList.add(borderColorClass)
  document.getElementById(`${column}-list`).appendChild(task)
  saveTask(taskId, task.querySelector('.task-content').textContent, column)
}

// Add event listeners for drag-and-drop
;['todo', 'inprogress', 'done', 'backlog'].forEach((column) => {
  document.getElementById(column).addEventListener('dragover', allowDrop)
  document.getElementById(column).addEventListener('drop', drop)
})
