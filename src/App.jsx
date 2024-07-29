import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import '../src/assets/scss/style.scss'
import Login from './layouts/Login'
import Home from './layouts/Home'
import { AuthProvider } from './AuthContext'
import ProtectedRoute from './ProtectedRoute'
import DetailPage from './layouts/DetailPage'
import Register from './layouts/Register'
import { UserProvider } from './context/UserContext'
import Profile from './layouts/Profile'
import Admin from './layouts/Admin'

function App() {

  return (
    <AuthProvider>
      <UserProvider>
        <Router>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/home' element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path='/movies/:contentId' element={<ProtectedRoute><DetailPage /></ProtectedRoute>} />
            <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path='/admin' element={<ProtectedRoute><Admin /></ProtectedRoute>} />
          </Routes>
        </Router>
      </UserProvider>
    </AuthProvider>
  )
}

export default App
