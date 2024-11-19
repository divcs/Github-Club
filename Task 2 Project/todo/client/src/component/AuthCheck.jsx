import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthCheck = ({ children }) => {
  const navigate = useNavigate('/login')
  const token = localStorage.getItem('token')
  useEffect(() => {
    if (!token) {
      navigate('/login')
    }
  }, [])
  return <div>{children}</div>
}

export default AuthCheck
