import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from './service/components/Login'
import SignUpPage from './service/components/SignUp'
import HomePage from './service/components/Home'
import ViewCapsule from './service/components/ViewCapsule'
import CreateCapsule from './service/components/CreateCapsule'
// import HomePage from './service/components/Home'

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignUpPage />} />
          <Route path='/' element={<HomePage />} />
          <Route path='/viewcapsule' element={<ViewCapsule />} />
          <Route path='/createcapsule' element={<CreateCapsule />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
