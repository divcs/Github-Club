function addTask() {
  const taskInput = document.getElementById('taskInput')

  const taskText = taskInput.value.trim()

  if (taskText !== '') {
    const task = document.createElement('div')
    task.classList.add(
      'task',
      'border-2',
      'border-blue-500',
      'p-4',
      'rounded-md',
      'flex',
      'justify-between',
      'items-start',
      'cursor-pointer'
    )
    task.setAttribute('id', 'task-' + new Date().getTime())

    task.setAttribute('draggable', 'true')
    task.setAttribute('ondragstart', 'drag(event)') //first is attribute second is a function

    const taskContent = document.createElement('span')
    taskContent.classList.add('task-content', 'text-white', 'max-w-[80%]')
    taskContent.textContent = taskText
    task.appendChild(taskContent)

    //Delete button
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
    })
    task.appendChild(deleteButton)

    //Append task to the list
    document.getElementById('todo-list').appendChild(task)
  }
}

function drag(event) {
  //   event.dataTransfer.setData used for drag karte wqt data transfer krne k liye
  event.dataTransfer.setData('text', event.target.id)
}

function allowDrop(event) {
  event.preventDefault()
  event.stopPropagation()
}

function drop(event) {
  event.preventDefault()
  event.stopPropagation()

  const targetColumn = event.target.closest('div') 
  const taskId = event.dataTransfer.getData('text')
  const draggedTask = document.getElementById(taskId)

  if (draggedTask) {
    if (targetColumn.id === 'todo') {
      draggedTask.classList.remove(
        'border-red-500',
        'border-yellow-500',
        'border-green-500'
      )
      draggedTask.classList.add('border-blue-500')
      document.getElementById('todo-list').appendChild(draggedTask)
    } else if (targetColumn.id === 'inprogress') {
      draggedTask.classList.remove(
        'border-blue-500',
        'border-green-500',
        'border-red-500'
      )
      draggedTask.classList.add('border-yellow-500')
      document.getElementById('inprogress-list').appendChild(draggedTask)
    } else if (targetColumn.id === 'done') {
      draggedTask.classList.remove(
        'border-blue-500',
        'border-yellow-500',
        'border-red-500'
      )
      draggedTask.classList.add('border-green-500')
      document.getElementById('done-list').appendChild(draggedTask)
    } else if (targetColumn.id === 'backlog') {
      draggedTask.classList.remove(
        'border-blue-500',
        'border-yellow-500',
        'border-green-500'
      )
      draggedTask.classList.add('border-red-500')
      document.getElementById('backlog-list').appendChild(draggedTask)
    }
  }
}

document.getElementById('todo').addEventListener('dragover', allowDrop)
document.getElementById('inprogress').addEventListener('dragover', allowDrop)
document.getElementById('done').addEventListener('dragover', allowDrop)
document.getElementById('backlog').addEventListener('dragover', allowDrop)

document.getElementById('todo').addEventListener('drop', drop)
document.getElementById('inprogress').addEventListener('drop', drop)
document.getElementById('done').addEventListener('drop', drop)
document.getElementById('backlog').addEventListener('drop', drop)
