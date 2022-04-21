import Landing from './components/Landing'
import Register from './components/Register'
import Login from './components/Login'
import Home from './components/Home'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import { useState } from 'react'
import { validators } from 'commons'

const { validateToken } = validators

function App() {
  const navigate = useNavigate()

  try {
    validateToken(sessionStorage.token)
  } catch(error) {
    delete sessionStorage.token
  }

  const { token } = sessionStorage

  const [loggedIn, setLoggedIn] = useState(!!token)

  const handleLoggedOut = () => setLoggedIn(false)

  const handleLoggedIn = () => {
    setLoggedIn(true)

    navigate('/')
  }

  return <Routes>
      <Route path="/*" element={loggedIn ? <Home onLoggedOut={handleLoggedOut} /> : <Landing />} />
      <Route path="/register" element={loggedIn ? <Navigate to="/" /> : <Register />} />
      <Route path="/login" element={loggedIn ? <Navigate to="/" /> : <Login onLoggedIn={handleLoggedIn} />} />
    </Routes>
}

export default App;