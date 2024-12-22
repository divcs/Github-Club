import { coverImage, postApi } from '../apiService'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { formatDate } from '../../helper/DateFormat'

// const getIndividualTimeCapsule = async (id) => {
// const navigate = useNavigate()
// const payload = { id: id }
// const response = await postApi('get-individual-time-capsule', payload)
// console.log({ response })
// if (response?.response?.data?.status === false) {
//   toast.error('Cannot be accessed yet')
// }

// toast.success('Access Granted')
// navigate(`/viewcapsule/id=${id}`)
// }

const TimeCapsuleCard = ({
  image,
  title,
  description,
  unlockDate,
  particularCapsuleData,
}) => {
  const navigate = useNavigate()

  const handleNavigate = (id) => {
    navigate(`/viewcapsule/?id=${id}`)
  }

  const deleteCapsule = async (id) => {
    const payload = { id: id }
    const response = await postApi('delete-time-capsule', payload)
    console.log({ response })
    if (response?.data?.status === true) {
      toast.success('Capsule Deleted')
      window.location.reload()
    }
    if (response?.response?.status === 400) {
      toast.error('Failed to delete')
    }
  }

  console.log(particularCapsuleData)
  return (
    <div className='bg-white rounded-lg shadow-md overflow-hidden flex flex-col'>
      <img
        src={`${coverImage}${image}`}
        alt={title}
        className='h-48 w-full object-cover'
      />
      <div className='p-4'>
        <h3 className='text-lg font-bold text-gray-800'>{title}</h3>
        <p className='text-sm text-gray-600 mb-4'>{description}</p>
        <div className='text-sm text-gray-500 flex items-center mb-4'>
          <span className='material-icons-outlined text-gray-400 mr-2'>
            lock
          </span>
          Unlocks on {formatDate(unlockDate)}
        </div>
        <div className='flex space-x-2'>
          <button
            className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm flex-1'
            onClick={() => handleNavigate(particularCapsuleData?._id)}
          >
            View
          </button>
          <button className='px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 text-sm flex-1'>
            Share
          </button>
          <button
            className='px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm flex-1'
            onClick={() => deleteCapsule(particularCapsuleData?._id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
export default TimeCapsuleCard
