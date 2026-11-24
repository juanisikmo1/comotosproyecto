<<<<<<< HEAD
import { useState, useEffect } from 'react'
=======
>>>>>>> c9589814d17790c7267de7f4587919de5d38102e
import { Link, useNavigate } from 'react-router-dom'
import Icon from './Icons.jsx'
import { authService } from '../services/authService.js'
import promoMoto from '../assets/ktm-390-duke.jpg'

const navItems = [
  { label: 'Inicio', href: '/', icon: 'home' },
  { label: 'Motos', href: '/#motos', icon: 'bike' },
  { label: 'Comparar', href: '/comparar', icon: 'compare' },
<<<<<<< HEAD
  { label: 'Favoritos', href: '/favoritos', icon: 'heart' },
=======
  { label: 'Favoritos', href: '/#favoritos', icon: 'heart' },
>>>>>>> c9589814d17790c7267de7f4587919de5d38102e
  { label: 'Estadísticas', href: '/#estadisticas', icon: 'chart' },
]

export default function WorkspaceLayout({ children, active = 'Inicio', searchValue = '', onSearchChange }) {
  const navigate = useNavigate()
  const user = authService.getUser()
<<<<<<< HEAD
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    try {
      const saved = localStorage.getItem('comotos_sidebar_open')
      return saved !== null ? JSON.parse(saved) : true
    } catch {
      return true
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('comotos_sidebar_open', JSON.stringify(sidebarOpen))
    } catch (e) {
      console.error(e)
    }
  }, [sidebarOpen])
=======
>>>>>>> c9589814d17790c7267de7f4587919de5d38102e

  function logout() {
    authService.logout()
    navigate('/', { replace: true })
  }

<<<<<<< HEAD
  function toggleSidebar() {
    setSidebarOpen((prev) => !prev)
  }

  return (
    <div className={`workspace-shell ${sidebarOpen ? 'sidebar-is-open' : 'sidebar-is-collapsed'}`}>
      {/* Botón flotante verticalmente centrado en el lateral para mostrar/ocultar con icono de 3 rayas */}
      <button
        type="button"
        className={`sidebar-toggle-handle ${sidebarOpen ? 'is-open' : 'is-collapsed'}`}
        onClick={toggleSidebar}
        aria-label={sidebarOpen ? 'Ocultar barra lateral' : 'Mostrar barra lateral'}
        title={sidebarOpen ? 'Ocultar menú' : 'Mostrar menú'}
      >
        <Icon name="menu" size={20} />
      </button>

      {/* Backdrop para pantallas móviles cuando la barra está desplegada */}
      {sidebarOpen && (
        <div
          className="sidebar-backdrop"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Barra lateral */}
      <aside className={`sidebar animated-sidebar ${sidebarOpen ? 'is-expanded' : 'is-collapsed'}`}>
        <div className="sidebar-header">
          <Link to="/" className="brand-wordmark">Comotos</Link>
          <button
            type="button"
            className="sidebar-close-btn"
            onClick={() => setSidebarOpen(false)}
            aria-label="Cerrar barra lateral"
            title="Cerrar"
          >
            <Icon name="close" size={18} />
          </button>
        </div>

=======
  return (
    <div className="workspace-shell">
      {/* Zona invisible en el borde izquierdo para detectar cuando el cursor se acerca */}
      <div className="sidebar-hover-trigger" title="Desliza aquí para ver el menú" />
      
      {/* Barra lateral con la clase autohide-sidebar para ocultarse y mostrarse al pasar el cursor */}
      <aside className="sidebar autohide-sidebar">
        <Link to="/" className="brand-wordmark">Comotos</Link>
>>>>>>> c9589814d17790c7267de7f4587919de5d38102e
        <nav className="sidebar-nav" aria-label="Navegación principal">
          {navItems.map((item) => (
            <Link 
              key={item.label} 
              to={item.href} 
              className={`sidebar-link ${active === item.label ? 'is-active' : ''}`}
            >
              <Icon name={item.icon} size={24} />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className="sidebar-promo">
          <img src={promoMoto} alt="Motocicleta destacada de COMOTOS" />
          <div className="sidebar-promo-overlay" />
          <div className="sidebar-promo-copy">
            <p>Encuentra tu próxima aventura.</p>
            <Link to="/registro" className="button button-primary button-small">Ver más <Icon name="arrow" size={16} /></Link>
          </div>
        </div>
        <div className="sidebar-footnote">Consulta · Compara · Elige</div>
      </aside>

<<<<<<< HEAD
      <div className="workspace-main animated-main">
        <header className="topbar">
          <button
            type="button"
            className="topbar-menu-toggle"
            onClick={toggleSidebar}
            aria-label={sidebarOpen ? 'Ocultar menú lateral' : 'Mostrar menú lateral'}
            title={sidebarOpen ? 'Ocultar menú' : 'Mostrar menú'}
          >
            <Icon name="menu" size={22} />
          </button>
=======
      <div className="workspace-main">
        <header className="topbar">
>>>>>>> c9589814d17790c7267de7f4587919de5d38102e
          <label className="global-search">
            <Icon name="search" size={22} />
            <input 
              type="search" 
              placeholder="Buscar motocicletas..." 
              aria-label="Buscar motocicletas" 
              value={searchValue} 
              onChange={(event) => onSearchChange?.(event.target.value)} 
            />
          </label>
          <div className="topbar-actions">
<<<<<<< HEAD
            <Link to="/favoritos" className={`icon-button ${active === 'Favoritos' ? 'is-active' : ''}`} aria-label="Favoritos" title="Favoritos">
              <Icon name="heart" size={22} />
=======
            <Link to="/#favoritos" className="icon-button" aria-label="Favoritos" title="Favoritos">
              <Icon name="star" size={24} />
>>>>>>> c9589814d17790c7267de7f4587919de5d38102e
            </Link>
            <button type="button" className="icon-button" aria-label="Notificaciones" title="Notificaciones">
              <Icon name="bell" size={23} />
            </button>
            {user ? (
              <button type="button" className="profile-control" onClick={logout} title="Cerrar sesión">
                <span className="profile-avatar">{user.nombre?.charAt(0)?.toUpperCase() || 'U'}</span>
                <span className="profile-name">Salir</span>
                <Icon name="chevron" size={15} />
              </button>
            ) : (
              <Link to="/login" className="profile-control" title="Iniciar sesión">
                <span className="profile-avatar"><Icon name="user" size={24} /></span>
                <Icon name="chevron" size={15} />
              </Link>
            )}
          </div>
        </header>
        {children}
      </div>
    </div>
  )
}