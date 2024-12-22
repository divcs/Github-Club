import React, { useState } from 'react'
import { postApi } from '../apiService'
import { toast } from 'sonner'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('Login Attempt:', { email, password })
    const payload = { email, password }

    const response = await postApi('login', payload)
    console.log(response)
    if (response?.data?.status === true) {
      // console.log(response.data.data.data)
      console.log('Hello')
      toast.success('Login Successful')
    }
  }

  return (
    <div className='flex items-center justify-center h-screen bg-gradient-to-r from-blue-400 to-purple-500'>
      <form
        onSubmit={handleSubmit}
        className='w-full max-w-md bg-white p-8 rounded-lg shadow-lg'
      >
        <h2 className='text-2xl font-bold text-center mb-6 text-gray-700'>
          Login
        </h2>

        <div className='mb-4'>
          <label
            htmlFor='email'
            className='block text-sm font-medium text-gray-600'
          >
            Email:
          </label>
          <input
            type='email'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter your email'
            className='w-full px-4 py-2 mt-1 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent'
            required
          />
        </div>

        <div className='mb-4'>
          <label
            htmlFor='password'
            className='block text-sm font-medium text-gray-600'
          >
            Password:
          </label>
          <input
            type='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Enter your password'
            className='w-full px-4 py-2 mt-1 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent'
            required
          />
        </div>

        <button
          type='submit'
          className='w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400'
        >
          Login
        </button>
      </form>
    </div>
  )
}

export default LoginPage
