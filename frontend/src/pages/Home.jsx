import { useMemo, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Icon from '../components/Icons.jsx'
import WorkspaceLayout from '../components/WorkspaceLayout.jsx'
import { motos, money } from '../data/motos.js'
import { favoritesService } from '../services/favoritesService.js'

function MotoCard({ moto, selected, favorite, onCompare, onFavorite }) {
  return (
    <article className="moto-card">
      <div className="moto-image-wrap">
        <img src={moto.image} alt={`${moto.marca} ${moto.modelo}`} className="moto-image" />
        <button
          type="button"
          className={`favorite-button ${favorite ? 'is-favorite' : ''}`}
          onClick={() => onFavorite(moto.id)}
          aria-label={favorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
          title={favorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
        >
          <Icon name="heart" size={19} />
        </button>
      </div>
      <div className="moto-card-content">
        <p className="moto-name">{moto.marca} {moto.modelo}</p>
        <p className="moto-price">{money(moto.precio)}</p>
        <div className="rating-row" aria-label={`Calificación demostrativa ${moto.rating} de 5`}>
          <span>★★★★★</span><small>{moto.rating.toFixed(1)}</small>
        </div>
        <button type="button" className={`compare-check ${selected ? 'is-selected' : ''}`} onClick={() => onCompare(moto.id)}>
          <span className="check-square">{selected && <Icon name="check" size={13} />}</span>
          <span>{selected ? 'Seleccionada' : 'Comparar'}</span>
        </button>
      </div>
    </article>
  )
}

export default function Home() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [marca, setMarca] = useState('Todas')
  const [tipo, setTipo] = useState('Todos')
  
  const [selected, setSelected] = useState(() => {
    try {
      const stored = localStorage.getItem('comotos_selected')
      return stored ? JSON.parse(stored) : [1, 2, 3]
    } catch {
      return [1, 2, 3]
    }
  })

  const [favorites, setFavorites] = useState(() => favoritesService.getFavorites())
  const [notice, setNotice] = useState('')

  useEffect(() => {
    favoritesService.fetchFromBackend()
    function handleFavoritesChange(e) {
      if (e.detail) {
        setFavorites(e.detail)
      } else {
        setFavorites(favoritesService.getFavorites())
      }
    }
    window.addEventListener('comotos_favorites_changed', handleFavoritesChange)
    return () => window.removeEventListener('comotos_favorites_changed', handleFavoritesChange)
  }, [])

  useEffect(() => {
    localStorage.setItem('comotos_selected', JSON.stringify(selected))
  }, [selected])

  const filtered = useMemo(() => motos.filter((moto) => {
    const queryMatch = `${moto.marca} ${moto.modelo}`.toLowerCase().includes(query.toLowerCase())
    const brandMatch = marca === 'Todas' || moto.marca === marca
    const typeMatch = tipo === 'Todos' || moto.tipo === tipo
    return queryMatch && brandMatch && typeMatch
  }), [query, marca, tipo])

  const chosen = motos.filter((moto) => selected.includes(moto.id))

  function toggleCompare(id) {
    setNotice('')
    let updated
    if (selected.includes(id)) {
      updated = selected.filter((item) => item !== id)
    } else {
      if (selected.length >= 4) {
        setNotice('Puedes seleccionar un máximo de 4 motocicletas.')
        return
      }
      updated = [...selected, id]
    }
    setSelected(updated)
    localStorage.setItem('comotos_selected', JSON.stringify(updated))
  }

  function toggleFavorite(id) {
    favoritesService.toggleFavorite(id)
    setFavorites(favoritesService.getFavorites())
  }

  function startCompare() {
    if (selected.length < 2) {
      setNotice('Selecciona al menos 2 motocicletas para compararlas.')
      return
    }
    navigate('/comparar')
  }

  return (
    <WorkspaceLayout active="Inicio" searchValue={query} onSearchChange={setQuery}>
      <main className="workspace-content">
        <div className="page-title-row">
          <div>
            <span className="section-kicker">BIENVENIDO A COMOTOS</span>
            <h1>Encuentra tu próxima moto</h1>
            <p>Explora modelos, conoce sus características y compara tus favoritas.</p>
          </div>
          <Link to="/registro" className="button button-primary create-account-button">Crear cuenta <Icon name="arrow" size={17} /></Link>
        </div>

        <div className="catalog-layout" id="motos">
          <section className="catalog-main">
            <div className="filters-row">
              <label className="filter-select">
                <span className="sr-only">Filtrar por marca</span>
                <select value={marca} onChange={(event) => setMarca(event.target.value)}>
                  <option value="Todas">Marca</option>
                  {Array.from(new Set(motos.map((moto) => moto.marca))).map((item) => <option key={item} value={item}>{item}</option>)}
                </select>
                <Icon name="chevron" size={15} />
              </label>
              <label className="filter-select">
                <span className="sr-only">Filtrar por tipo</span>
                <select value={tipo} onChange={(event) => setTipo(event.target.value)}>
                  <option value="Todos">Tipo</option>
                  {Array.from(new Set(motos.map((moto) => moto.tipo))).map((item) => <option key={item} value={item}>{item}</option>)}
                </select>
                <Icon name="chevron" size={15} />
              </label>
              <button type="button" className="filter-button" onClick={() => { setMarca('Todas'); setTipo('Todos'); setQuery('') }}>
                <span>Limpiar filtros</span><Icon name="tune" size={18} />
              </button>
            </div>

            <div className="catalog-heading-row">
              <h2>Motos destacadas</h2>
              <span>{filtered.length} modelos</span>
            </div>
            <div className="moto-grid">
              {filtered.map((moto) => (
                <MotoCard key={moto.id} moto={moto} selected={selected.includes(moto.id)} favorite={favorites.includes(moto.id)} onCompare={toggleCompare} onFavorite={toggleFavorite} />
              ))}
            </div>
            {filtered.length === 0 && <div className="empty-state">No encontramos motos con esos criterios. Prueba con otra búsqueda.</div>}
            <div className="catalog-note">Datos e imágenes de demostración para el diseño inicial de COMOTOS.</div>
          </section>

          <aside className="compare-panel" id="comparador">
            <div className="compare-panel-header">
              <h2>Motos seleccionadas ({chosen.length}/4)</h2>
              <button type="button" className="icon-button compact" title="Limpiar selección" aria-label="Limpiar selección" onClick={() => { setSelected([]); localStorage.setItem('comotos_selected', JSON.stringify([])); setNotice('') }}><Icon name="trash" size={18} /></button>
            </div>
            <div className="selected-list">
              {chosen.length === 0 ? (
                <div className="selected-empty"><Icon name="compare" size={28} /><p>Selecciona motos del catálogo para comenzar a compararlas.</p></div>
              ) : chosen.map((moto) => (
                <div className="selected-moto" key={moto.id}>
                  <img src={moto.image} alt="" />
                  <div className="selected-moto-info"><strong>{moto.marca} {moto.modelo}</strong><span>{money(moto.precio)}</span></div>
                  <button type="button" className="remove-selected" aria-label={`Quitar ${moto.modelo}`} onClick={() => toggleCompare(moto.id)}><Icon name="close" size={17} /></button>
                </div>
              ))}
            </div>
            <div className="compare-action-area">
              <button type="button" className="button button-primary button-full" onClick={startCompare}><Icon name="chart" size={18} /> Comparar ahora</button>
              {notice && <p className="inline-notice" role="status">{notice}</p>}
            </div>
          </aside>
        </div>
      </main>
    </WorkspaceLayout>
  )
}