import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Compare from './pages/Compare.jsx'
<<<<<<< HEAD
import Favorites from './pages/Favorites.jsx'
=======
>>>>>>> c9589814d17790c7267de7f4587919de5d38102e

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/comparar" element={<Compare />} />
<<<<<<< HEAD
        <Route path="/favoritos" element={<Favorites />} />
=======
>>>>>>> c9589814d17790c7267de7f4587919de5d38102e
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/panel" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}