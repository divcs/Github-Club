import axios from 'axios'

// Base URL for the API
export const baseUrl = 'http://localhost:5000/api/' // Replace with your API base URL
export const coverImage = 'http://localhost:5000/' // Replace with your API base URL

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: baseUrl,
})

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Retrieve the token from localStorage
    const token = localStorage.getItem('token')

    // If the token exists, set it in the Authorization header
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    // Handle errors before the request is sent
    console.error('Error in Request Interceptor:', error)
    return Promise.reject(error)
  }
)

// Response Interceptor (optional)
axiosInstance.interceptors.response.use(
  (response) => {
    // Handle successful responses
    return response
  },
  (error) => {
    // Handle error responses
    console.error('Error in Response Interceptor:', error)
    return Promise.reject(error)
  }
)

// Function for GET requests
export const getApi = async (url) => {
  try {
    const response = await axiosInstance.get(url)
    return response // Return response data directly
  } catch (err) {
    console.error('Error in GET request:', err)
    return err // Throw the error to handle it in the calling function
  }
}

// Function for POST requests
export const postApi = async (url, data) => {
  try {
    const response = await axiosInstance.post(url, data)
    return response // Return response data directly
  } catch (err) {
    console.error('Error in POST request:', err)
    return err // Throw the error to handle it in the calling function
  }
}

export const postMultipartApi = async (url, formData) => {
  try {
    const response = await axiosInstance.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response // Return response data directly
  } catch (err) {
    console.error('Error in POST multipart request:', err)
    return err // Throw the error to handle it in the calling function
  }
}

// Export the Axios instance for custom requests if needed
export default axiosInstance
