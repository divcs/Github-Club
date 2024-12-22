import { useEffect, useState } from 'react'
import TimeCapsuleCard from './TimeCapsuleCard'
import { getApi } from '../apiService'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
  const [capsuleData, setCapsuleData] = useState()
  const navigate = useNavigate()

  // Fetch time capsule data
  const fetchData = async () => {
    const response = await getApi('get-all-time-capsule')
    setCapsuleData(response?.data?.data)
    console.log(response?.data?.data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleNavigate = () => {
    navigate('/createcapsule')
  }

  // Handle logout functionality
  const handleLogout = () => {
    // Clear the authentication token from localStorage
    localStorage.removeItem('token')

    // Redirect to the login page
    navigate('/login')
  }

  return (
    <div className='min-h-screen bg-gray-100 py-8 px-4'>
      <div className='max-w-7xl mx-auto'>
        <header className='flex justify-between items-center mb-8'>
          <h1 className='text-3xl font-bold text-gray-800'>
            Your Time Capsules
          </h1>
          <div className='flex items-center space-x-4'>
            <button
              className='px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 text-sm'
              onClick={handleNavigate}
            >
              + Create New Capsule
            </button>
            <button
              className='px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm'
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </header>
        <p className='text-gray-600 mb-8 text-lg'>
          Preserve your memories for the future.
        </p>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {capsuleData?.map((item, index) => (
            <TimeCapsuleCard
              key={index}
              image={item?.coverPhoto}
              title={item?.title}
              description={item?.description}
              unlockDate={item?.dateTime}
              particularCapsuleData={item}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default HomePage
