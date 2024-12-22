import axios from 'axios'

const baseUrl = 'http://localhost:5000/api/' // Replace with your API base URL

// Function for GET requests
export const getApi = async (url) => {
  try {
    const response = await axios.get(`${baseUrl}${url}`)
    return response
  } catch (err) {
    console.error('Error in GET request:', err)
    return err // Rethrow the error for further handling
  }
}

// Function for POST requests
export const postApi = async (url, data) => {
  try {
    const response = await axios.post(`${baseUrl}${url}`, data)
    return response
  } catch (err) {
    console.error('Error in POST request:', err)
    return err
  }
}
