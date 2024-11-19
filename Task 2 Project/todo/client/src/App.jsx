import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Home'
import Signup from './Signup'
import Login from './Login'
import AuthCheck from './component/AuthCheck'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path='/'
          element={
            <AuthCheck>
              <Home />
            </AuthCheck>
          }
        />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App
