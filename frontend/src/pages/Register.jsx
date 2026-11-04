import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout.jsx'
import Icon from '../components/Icons.jsx'
import { authService } from '../services/authService.js'

// Trello: Integrante 2 — formulario UI Registro; envía los datos al endpoint del Integrante 4.
export default function Register() {
  const navigate = useNavigate()
  const [nombre, setNombre] = useState('')
  const [correo, setCorreo] = useState('')
  const [password, setPassword] = useState('')
  const [confirmarPassword, setConfirmarPassword] = useState('')
  const [error, setError] = useState('')
  const [cargando, setCargando] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    if (nombre.trim().length < 2) {
      setError('Escribe tu nombre completo.')
      return
    }
    if (password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres.')
      return
    }
    if (password !== confirmarPassword) {
      setError('Las contraseñas no coinciden.')
      return
    }
    setCargando(true)
    try {
      await authService.register({ nombre: nombre.trim(), correo: correo.trim().toLowerCase(), password })
      navigate('/login', { replace: true, state: { mensaje: 'Cuenta creada correctamente. Ahora inicia sesión.' } })
    } catch (err) {
      setError(err.message || 'No fue posible crear la cuenta.')
    } finally {
      setCargando(false)
    }
  }

  return (
    <AuthLayout mode="register" eyebrow="EMPIEZA TU VIAJE" title="Crea tu cuenta" subtitle="Regístrate para explorar modelos y guardar tus motocicletas favoritas.">
      {error && <div role="alert" className="form-alert error-alert">{error}</div>}
      <form className="auth-form" onSubmit={handleSubmit}>
        <label className="form-field" htmlFor="nombre">
          <span>Nombre completo</span>
          <div className="input-with-icon"><Icon name="user" size={19} /><input id="nombre" name="nombre" type="text" autoComplete="name" required minLength={2} maxLength={100} value={nombre} onChange={(event) => setNombre(event.target.value)} placeholder="Escribe tu nombre" /></div>
        </label>
        <label className="form-field" htmlFor="correo">
          <span>Correo electrónico</span>
          <div className="input-with-icon"><Icon name="mail" size={19} /><input id="correo" name="correo" type="email" autoComplete="email" required value={correo} onChange={(event) => setCorreo(event.target.value)} placeholder="tu@correo.com" /></div>
        </label>
        <div className="form-two-columns">
          <label className="form-field" htmlFor="password">
            <span>Contraseña</span>
            <div className="input-with-icon"><Icon name="lock" size={19} /><input id="password" name="password" type="password" autoComplete="new-password" required minLength={8} maxLength={128} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Mínimo 8 caracteres" /></div>
          </label>
          <label className="form-field" htmlFor="confirmarPassword">
            <span>Confirmar contraseña</span>
            <div className="input-with-icon"><Icon name="lock" size={19} /><input id="confirmarPassword" name="confirmarPassword" type="password" autoComplete="new-password" required value={confirmarPassword} onChange={(event) => setConfirmarPassword(event.target.value)} placeholder="Repite la contraseña" /></div>
          </label>
        </div>
        <p className="form-help">Usa al menos 8 caracteres. Las contraseñas se validan antes de enviar el formulario.</p>
        <button type="submit" disabled={cargando} className="button button-primary button-full auth-submit">{cargando ? 'Creando cuenta...' : 'Crear cuenta'} <Icon name="arrow" size={18} /></button>
      </form>
      <div className="auth-switch">¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link></div>
      <p className="auth-security-note"><Icon name="lock" size={15} /> COMOTOS no almacena la contraseña en el navegador.</p>
    </AuthLayout>
  )
}
