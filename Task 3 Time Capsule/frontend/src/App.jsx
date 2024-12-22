import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from './service/components/Login'

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path='/login' element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
