import React, { useState } from 'react'
import axios from 'axios'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css' // Import the styles for react-quill

import { useNavigate } from 'react-router-dom'
import { postMultipartApi } from '../apiService'
import { toast } from 'sonner'
const CreateTimeCapsule = () => {
  const [title, setTitle] = useState('')
  const [dateTime, setDateTime] = useState('')
  const [description, setDescription] = useState('')
  const [content, setContent] = useState('')
  const [coverPhoto, setCoverPhoto] = useState(null)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const handleFileChange = (e) => {
    setCoverPhoto(e.target.files[0])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('title', title)
    formData.append('dateTime', dateTime)
    formData.append('description', description)
    formData.append('content', content)
    formData.append('coverPhoto', coverPhoto)

    setLoading(true)

    try {
      const response = await postMultipartApi('/create-time-capsule', formData)
      setLoading(false)
      console.log({ response })
      if (response?.data?.status === true) {
        toast.success('Time Capsule created successfully!')

        navigate('/') // Redirect to dashboard after successful creation
      }
    } catch (error) {
      setLoading(false)
      console.error('Error creating time capsule:', error)
    }
  }

  return (
    <div className='max-w-4xl mx-auto p-6'>
      <h1 className='text-3xl font-bold mb-4'>Create Time Capsule</h1>
      <form onSubmit={handleSubmit} encType='multipart/form-data'>
        {/* Title */}
        <div className='mb-4'>
          <label
            htmlFor='title'
            className='block text-sm font-medium text-gray-700'
          >
            Title
          </label>
          <input
            type='text'
            id='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='mt-1 p-2 w-full border border-gray-300 rounded-md'
            required
          />
        </div>

        {/* Date and Time */}
        <div className='mb-4'>
          <label
            htmlFor='dateTime'
            className='block text-sm font-medium text-gray-700'
          >
            Unlock Date and Time
          </label>
          <input
            type='datetime-local'
            id='dateTime'
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
            className='mt-1 p-2 w-full border border-gray-300 rounded-md'
            required
          />
        </div>

        {/* Description */}
        <div className='mb-4'>
          <label
            htmlFor='description'
            className='block text-sm font-medium text-gray-700'
          >
            Description
          </label>
          <input
            type='text'
            id='description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className='mt-1 p-2 w-full border border-gray-300 rounded-md'
            required
          />
        </div>

        {/* Content Editor */}
        <div className='mb-4'>
          <label
            htmlFor='content'
            className='block text-sm font-medium text-gray-700'
          >
            Content
          </label>
          <ReactQuill
            value={content}
            onChange={setContent}
            className='mt-1 border border-gray-300 rounded-md'
            theme='snow'
            required
          />
        </div>

        {/* Cover Photo */}
        <div className='mb-4'>
          <label
            htmlFor='coverPhoto'
            className='block text-sm font-medium text-gray-700'
          >
            Cover Photo
          </label>
          <input
            type='file'
            id='coverPhoto'
            onChange={handleFileChange}
            className='mt-1 p-2 w-full border border-gray-300 rounded-md'
            required
          />
        </div>

        {/* Submit Button */}
        <div className='flex justify-end'>
          <button
            type='submit'
            disabled={loading}
            className={`bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Creating...' : 'Create Time Capsule'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateTimeCapsule
