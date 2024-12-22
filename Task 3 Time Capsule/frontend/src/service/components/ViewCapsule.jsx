import React, { useEffect, useState } from 'react'
import { Lock, ArrowLeft } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import { coverImage, postApi } from '../apiService'
import { formatDate } from '../../helper/DateFormat'

const ViewCapsule = () => {
  const [timeCapsuleNotOpen, setTimeCapsuleNotOpen] = useState(true)
  const [timeCapsuleOpen, setTimeCapsuleOpen] = useState(false)
  const [timeCapsuleData, setTimeCapsuleData] = useState()

  const [searchParams] = useSearchParams()
  const id = searchParams.get('id')

  const fetchData = async () => {
    const response = await postApi('get-individual-time-capsule', { id })
    console.log({ response })
    if (response?.response?.data?.status === false) {
      setTimeCapsuleNotOpen(true)
      setTimeCapsuleOpen(false)
      // toast.error('Cannot be accessed yet')
    }
    if (response?.data?.status === true) {
      setTimeCapsuleNotOpen(false)
      setTimeCapsuleOpen(true)
      setTimeCapsuleData(response?.data?.data)
    }
  }

  useEffect(() => {
    fetchData()
  }, [id])

  return (
    <div className='max-w-4xl mx-auto p-6'>
      {/* Back Button */}
      <button
        className='flex items-center text-blue-600 hover:underline mb-6'
        onClick={() => window.history.back()}
      >
        <ArrowLeft className='w-5 h-5 mr-2' />
        Back to Dashboard
      </button>

      {/* Capsule Card */}
      <div className='bg-white shadow-lg rounded-lg overflow-hidden'>
        {/* Image Section */}
        {timeCapsuleOpen && (
          <img
            src={`${coverImage}${timeCapsuleData?.coverPhoto}`}
            alt='Capsule Thumbnail'
            className='w-full h-64 object-cover'
          />
        )}

        {/* Content Section */}
        <div className='p-6 text-center'>
          {timeCapsuleOpen && (
            <>
              <h1 className='text-3xl font-bold mb-2'>
                {timeCapsuleData?.title}
              </h1>
              <p className='text-gray-600 mb-4'>
                {timeCapsuleData?.description}
              </p>
              <p className='text-gray-600 mb-4'>{timeCapsuleData?.content}</p>
            </>
          )}
          {timeCapsuleNotOpen && (
            <p className='text-sm text-gray-500 italic mb-6'>
              Unlocks on{' '}
              <span className='font-medium'>
                {formatDate(timeCapsuleData?.dateTime)}
              </span>
            </p>
          )}

          {/* Lock Status */}
          {timeCapsuleNotOpen && (
            <div className='flex flex-col items-center'>
              <Lock className='w-10 h-10 text-gray-500 mb-3' />
              <p className='text-gray-600 mb-4'>
                This time capsule is currently locked
              </p>
              <button className='bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition'>
                Unlock Now
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ViewCapsule
