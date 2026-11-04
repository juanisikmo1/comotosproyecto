import { Navigate, useNavigate } from 'react-router-dom'
import Icon from '../components/Icons.jsx'
import WorkspaceLayout from '../components/WorkspaceLayout.jsx'
import { authService } from '../services/authService.js'

// Trello: Integrante 2 — pantalla temporal de sesión, conectada al resultado del backend del Integrante 4.
export default function Dashboard() {
  const navigate = useNavigate()
  const user = authService.getUser()
  if (!user) return <Navigate to="/login" replace />

  function salir() {
    authService.logout()
    navigate('/', { replace: true })
  }

  return (
    <WorkspaceLayout active="Inicio">
      <main className="workspace-content dashboard-content">
        <div className="page-title-row">
          <div><span className="section-kicker">TU ESPACIO COMOTOS</span><h1>¡Bienvenido/a, {user.nombre}!</h1><p>Tu sesión está iniciada. Sigue explorando y comparando motocicletas.</p></div>
          <button type="button" className="button button-outline" onClick={salir}><Icon name="logout" size={17} /> Cerrar sesión</button>
        </div>
        <section className="welcome-card">
          <div className="welcome-icon"><Icon name="user" size={28} /></div>
          <div><h2>Tu cuenta está activa</h2><p>{user.correo}</p><span className="account-role">Rol: {user.rol}</span></div>
        </section>
        <a href="/#motos" className="button button-primary dashboard-cta">Explorar motocicletas <Icon name="arrow" size={18} /></a>
      </main>
    </WorkspaceLayout>
  )
}
