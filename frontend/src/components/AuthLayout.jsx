import { Link } from 'react-router-dom'
import Icon from './Icons.jsx'
import promoMoto from '../assets/bmw-r1250.jpg'

// Trello: Integrante 2 — panel visual compartido para Inicio de sesión y Registro.
export default function AuthLayout({ children, eyebrow, title, subtitle, mode = 'login' }) {
  return (
    <main className="auth-shell">
      <aside className="auth-brand-panel">
        <Link to="/" className="brand-wordmark">Comotos</Link>
        <div className="auth-brand-message">
          <span className="eyebrow-light">COMOTOS · TU PRÓXIMA AVENTURA</span>
          <h1>{mode === 'register' ? 'Tu próxima moto empieza con una buena elección.' : 'Vuelve a encontrar tu próxima aventura.'}</h1>
          <p>Explora modelos, conoce sus características y compara tus opciones en un solo lugar.</p>
          <div className="auth-benefits">
            <span><Icon name="check" size={17} /> Información organizada</span>
            <span><Icon name="check" size={17} /> Comparación sencilla</span>
            <span><Icon name="check" size={17} /> Tus opciones favoritas</span>
          </div>
        </div>
        <div className="auth-image-frame"><img src={promoMoto} alt="Motocicleta destacada" /><span>Consulta. Compara. Elige.</span></div>
      </aside>
      <section className="auth-content">
        <div className="auth-content-top"><Link to="/" className="back-link"><span aria-hidden="true">←</span> Volver al inicio</Link><span className="auth-mini-brand">COMOTOS</span></div>
        <div className="auth-form-wrap">
          <div className="auth-form-heading"><span className="auth-eyebrow">{eyebrow}</span><h2>{title}</h2><p>{subtitle}</p></div>
          {children}
        </div>
        <footer className="auth-footer">COMOTOS · Proyecto académico ADSO</footer>
      </section>
    </main>
  )
}
