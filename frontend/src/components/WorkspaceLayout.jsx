import { Link, useNavigate } from 'react-router-dom'
import Icon from './Icons.jsx'
import { authService } from '../services/authService.js'
import promoMoto from '../assets/ktm-390-duke.jpg'

// Trello: Integrante 2 — estructura compartida de navegación, barra superior y estilo del wireframe.
const navItems = [
  { label: 'Inicio', href: '/', icon: 'home' },
  { label: 'Motos', href: '/#motos', icon: 'bike' },
  { label: 'Comparar', href: '/#comparador', icon: 'compare' },
  { label: 'Favoritos', href: '/#favoritos', icon: 'heart' },
  { label: 'Estadísticas', href: '/#estadisticas', icon: 'chart' },
]

export default function WorkspaceLayout({ children, active = 'Inicio', searchValue = '', onSearchChange }) {
  const navigate = useNavigate()
  const user = authService.getUser()

  function logout() {
    authService.logout()
    navigate('/', { replace: true })
  }

  return (
    <div className="workspace-shell">
      <aside className="sidebar">
        <Link to="/" className="brand-wordmark">Comotos</Link>
        <nav className="sidebar-nav" aria-label="Navegación principal">
          {navItems.map((item) => (
            <a key={item.label} href={item.href} className={`sidebar-link ${active === item.label ? 'is-active' : ''}`}>
              <Icon name={item.icon} size={24} />
              <span>{item.label}</span>
            </a>
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

      <div className="workspace-main">
        <header className="topbar">
          <label className="global-search">
            <Icon name="search" size={22} />
            <input type="search" placeholder="Buscar motocicletas..." aria-label="Buscar motocicletas" value={searchValue} onChange={(event) => onSearchChange?.(event.target.value)} />
          </label>
          <div className="topbar-actions">
            <Link to="/#favoritos" className="icon-button" aria-label="Favoritos" title="Favoritos"><Icon name="star" size={24} /></Link>
            <button type="button" className="icon-button" aria-label="Notificaciones" title="Notificaciones"><Icon name="bell" size={23} /></button>
            {user ? (
              <button type="button" className="profile-control" onClick={logout} title="Cerrar sesión">
                <span className="profile-avatar">{user.nombre?.charAt(0)?.toUpperCase() || 'U'}</span>
                <span className="profile-name">Salir</span><Icon name="chevron" size={15} />
              </button>
            ) : (
              <Link to="/login" className="profile-control" title="Iniciar sesión"><span className="profile-avatar"><Icon name="user" size={24} /></span><Icon name="chevron" size={15} /></Link>
            )}
          </div>
        </header>
        {children}
      </div>
    </div>
  )
}
