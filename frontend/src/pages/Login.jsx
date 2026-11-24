import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout.jsx'
import Icon from '../components/Icons.jsx'
import { authService } from '../services/authService.js'

// Trello: Integrante 2 — formulario UI Login; consume la API asignada al Integrante 4.
export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const [correo, setCorreo] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [cargando, setCargando] = useState(false)
  const mensaje = location.state?.mensaje

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    if (!correo.trim() || !password) {
      setError('Escribe tu correo y contraseña.')
      return
    }
    setCargando(true)
    try {
      await authService.login({ correo: correo.trim().toLowerCase(), password })
      navigate('/panel', { replace: true })
    } catch (err) {
      setError(err.message || 'No fue posible iniciar sesión.')
    } finally {
      setCargando(false)
    }
  }

  return (
    <AuthLayout mode="login" eyebrow="QUÉ BUENO VERTE DE NUEVO" title="Iniciar sesión" subtitle="Ingresa tus datos para continuar explorando COMOTOS.">
      {mensaje && <div role="status" className="form-alert success-alert">{mensaje}</div>}
      {error && <div role="alert" className="form-alert error-alert">{error}</div>}
      <form className="auth-form" onSubmit={handleSubmit}>
        <label className="form-field" htmlFor="correo">
          <span>Correo electrónico</span>
          <div className="input-with-icon"><Icon name="mail" size={19} /><input id="correo" name="correo" type="email" autoComplete="email" required value={correo} onChange={(event) => setCorreo(event.target.value)} placeholder="tu@correo.com" /></div>
        </label>
        <label className="form-field" htmlFor="password">
          <span>Contraseña</span>
          <div className="input-with-icon"><Icon name="lock" size={19} /><input id="password" name="password" type="password" autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Ingresa tu contraseña" /></div>
        </label>
        <button type="submit" disabled={cargando} className="button button-primary button-full auth-submit">{cargando ? 'Validando...' : 'Iniciar sesión'} <Icon name="arrow" size={18} /></button>
      </form>
      <div className="auth-switch">¿Todavía no tienes cuenta? <Link to="/registro">Crear cuenta</Link></div>
      <p className="auth-security-note"><Icon name="lock" size={15} /> Tus credenciales se validan mediante la API de COMOTOS.</p>
    </AuthLayout>
  )
}
