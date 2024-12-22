import React, { useState } from 'react'
import { postApi } from '../apiService'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const navigate = useNavigate()
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match!')
      return
    }

    const response = await postApi('register', formData)
    console.log({ response })
    if (response?.data?.status === true) {
      toast.success('Registration Successful')
      navigate('/login')
    }

    if (response?.response?.status === 400) {
      toast.error('Registration Failed')
    }
  }

  return (
    <div className='flex items-center justify-center h-screen bg-gradient-to-r from-green-400 to-blue-500'>
      <form
        onSubmit={handleSubmit}
        className='w-full max-w-md bg-white p-8 rounded-lg shadow-lg'
      >
        <h2 className='text-2xl font-bold text-center mb-6 text-gray-700'>
          Sign Up
        </h2>

        <div className='mb-4'>
          <label
            htmlFor='name'
            className='block text-sm font-medium text-gray-600'
          >
            Name:
          </label>
          <input
            type='text'
            id='name'
            name='name'
            value={formData.name}
            onChange={handleChange}
            placeholder='Enter your name'
            className='w-full px-4 py-2 mt-1 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent'
            required
          />
        </div>

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
            name='email'
            value={formData.email}
            onChange={handleChange}
            placeholder='Enter your email'
            className='w-full px-4 py-2 mt-1 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent'
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
            name='password'
            value={formData.password}
            onChange={handleChange}
            placeholder='Enter your password'
            className='w-full px-4 py-2 mt-1 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent'
            required
          />
        </div>

        <div className='mb-6'>
          <label
            htmlFor='confirmPassword'
            className='block text-sm font-medium text-gray-600'
          >
            Confirm Password:
          </label>
          <input
            type='password'
            id='confirmPassword'
            name='confirmPassword'
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder='Confirm your password'
            className='w-full px-4 py-2 mt-1 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent'
            required
          />
        </div>

        <button
          type='submit'
          className='w-full px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400'
        >
          Sign Up
        </button>
      </form>
    </div>
  )
}

export default SignUpPage
