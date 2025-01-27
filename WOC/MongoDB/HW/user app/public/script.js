document.addEventListener('DOMContentLoaded', () => {
  fetchUsers()

  document
    .getElementById('addUserForm')
    .addEventListener('submit', async (e) => {
      e.preventDefault()

      const userData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        age: parseInt(document.getElementById('age').value),
      }

      try {
        const response = await fetch('/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        })

        if (response.ok) {
          fetchUsers()
          document.getElementById('addUserForm').reset()
        }
      } catch (error) {
        console.error('Error:', error)
      }
    })
})

async function fetchUsers() {
  try {
    const response = await fetch('/api/users')
    const users = await response.json()
    displayUsers(users)
  } catch (error) {
    console.error('Error:', error)
  }
}

function displayUsers(users) {
  const usersList = document.getElementById('usersList')
  usersList.innerHTML = ''

  users.forEach((user) => {
    const userCard = document.createElement('div')
    userCard.className = 'border p-4 rounded'
    userCard.innerHTML = `
            <div class="flex justify-between items-center">
                <div>
                    <h3 class="font-semibold">${user.name}</h3>
                    <p class="text-gray-600">${user.email}</p>
                    <p class="text-gray-600">Age: ${user.age}</p>
                </div>
                <div class="space-x-2">
                    <button onclick="editUser('${user._id}')" class="bg-yellow-500 text-white px-3 py-1 rounded">
                        Edit
                    </button>
                    <button onclick="deleteUser('${user._id}')" class="bg-red-500 text-white px-3 py-1 rounded">
                        Delete
                    </button>
                </div>
            </div>
        `
    usersList.appendChild(userCard)
  })
}

async function deleteUser(userId) {
  if (confirm('Are you sure you want to delete this user?')) {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        fetchUsers()
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }
}

async function editUser(userId) {
  const newName = prompt('Enter new name:')
  const newEmail = prompt('Enter new email:')
  const newAge = prompt('Enter new age:')

  if (newName && newEmail && newAge) {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newName,
          email: newEmail,
          age: parseInt(newAge),
        }),
      })

      if (response.ok) {
        fetchUsers()
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }
}
