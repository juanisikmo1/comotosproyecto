// Pestaña Favoritos
import { useState, useEffect, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Icon from '../components/Icons.jsx'
import WorkspaceLayout from '../components/WorkspaceLayout.jsx'
import { motos, money } from '../data/motos.js'
import { favoritesService } from '../services/favoritesService.js'

// Tarjeta de motocicleta en favoritos
function FavoriteMotoCard({ moto, selected, onCompare, onFavorite }) {
  return (
    <article className="moto-card">
      <div className="moto-image-wrap">
        <img src={moto.image} alt={`${moto.marca} ${moto.modelo}`} className="moto-image" />
        <button
          type="button"
          className="favorite-button is-favorite"
          onClick={() => onFavorite(moto.id)}
          aria-label="Quitar de favoritos"
          title="Quitar de favoritos"
        >
          <Icon name="heart" size={19} />
        </button>
      </div>
      <div className="moto-card-content">
        <p className="moto-name">{moto.marca} {moto.modelo}</p>
        <p className="moto-price">{money(moto.precio)}</p>
        <div className="rating-row" aria-label={`Calificación ${moto.rating} de 5`}>
          <span>★★★★★</span><small>{moto.rating.toFixed(1)}</small>
        </div>
        <button
          type="button"
          className={`compare-check ${selected ? 'is-selected' : ''}`}
          onClick={() => onCompare(moto.id)}
        >
          <span className="check-square">{selected && <Icon name="check" size={13} />}</span>
          <span>{selected ? 'Seleccionada' : 'Comparar'}</span>
        </button>
      </div>
    </article>
  )
}

// Vista principal de Favoritos
export default function Favorites() {
  const navigate = useNavigate()

  // Estado
  const [favoriteIds, setFavoriteIds] = useState(() => favoritesService.getFavorites())
  const [query, setQuery] = useState('')
  const [sortOrder, setSortOrder] = useState('default')
  const [notice, setNotice] = useState('')

  // Estado de comparación
  const [selected, setSelected] = useState(() => {
    try {
      const stored = localStorage.getItem('comotos_selected')
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

<<<<<<< HEAD
  // Escuchar cambios en favoritos y cargar del backend si hay sesión
  useEffect(() => {
    favoritesService.fetchFromBackend().then((ids) => {
      if (ids && ids.length > 0) setFavoriteIds(ids)
    })

=======
  // Escuchar cambios en favoritos
  useEffect(() => {
>>>>>>> c9589814d17790c7267de7f4587919de5d38102e
    function handleFavoritesChange(e) {
      if (e.detail) {
        setFavoriteIds(e.detail)
      } else {
        setFavoriteIds(favoritesService.getFavorites())
      }
    }

    window.addEventListener('comotos_favorites_changed', handleFavoritesChange)
    return () => window.removeEventListener('comotos_favorites_changed', handleFavoritesChange)
  }, [])

  // Guardar motos seleccionadas para comparar
  useEffect(() => {
    localStorage.setItem('comotos_selected', JSON.stringify(selected))
  }, [selected])

  // Obtener motos favoritas
  const favoriteMotos = useMemo(() => {
    return motos.filter((moto) => favoriteIds.includes(moto.id))
  }, [favoriteIds])

  // Filtrar y ordenar motos favoritas
  const filteredMotos = useMemo(() => {
    let result = favoriteMotos.filter((moto) => {
      const fullText = `${moto.marca} ${moto.modelo} ${moto.tipo}`.toLowerCase()
      return fullText.includes(query.toLowerCase())
    })

    if (sortOrder === 'price-asc') {
      result = [...result].sort((a, b) => a.precio - b.precio)
    } else if (sortOrder === 'price-desc') {
      result = [...result].sort((a, b) => b.precio - a.precio)
    } else if (sortOrder === 'rating') {
      result = [...result].sort((a, b) => b.rating - a.rating)
    }

    return result
  }, [favoriteMotos, query, sortOrder])

  // Quitar de favoritos
  function handleToggleFavorite(id) {
    favoritesService.toggleFavorite(id)
    setFavoriteIds(favoritesService.getFavorites())
  }

  // Limpiar todos los favoritos
  function handleClearFavorites() {
    if (window.confirm('¿Deseas eliminar todas las motos de favoritos?')) {
      favoritesService.clearFavorites()
      setFavoriteIds([])
    }
  }

  // Alternar selección para comparar
  function toggleCompare(id) {
    setNotice('')
    let updated
    if (selected.includes(id)) {
      updated = selected.filter((item) => item !== id)
    } else {
      if (selected.length >= 4) {
        setNotice('Puedes seleccionar un máximo de 4 motocicletas para comparar.')
        return
      }
      updated = [...selected, id]
    }
    setSelected(updated)
  }

  // Ir a comparar
  function handleGoToCompare() {
    if (selected.length < 2) {
      setNotice('Selecciona al menos 2 motocicletas para compararlas.')
      return
    }
    navigate('/comparar')
  }

  return (
    <WorkspaceLayout active="Favoritos" searchValue={query} onSearchChange={setQuery}>
      <main className="workspace-content favorites-page-container">
        {/* Cabecera */}
        <div className="page-title-row">
          <div>
            <span className="section-kicker">SELECCIÓN GUARDADA</span>
            <h1>Tus Motos Favoritas</h1>
            <p>Motocicletas guardadas con el corazón. Revísalas, compáralas o explora nuevos modelos.</p>
          </div>
          <div className="compare-top-buttons">
            {favoriteMotos.length > 0 && (
              <button type="button" className="button button-outline" onClick={handleClearFavorites}>
                <Icon name="trash" size={17} /> Limpiar favoritos
              </button>
            )}
            <Link to="/" className="button button-primary">
              <Icon name="bike" size={17} /> Explorar catálogo
            </Link>
          </div>
        </div>

        {/* Notificaciones */}
        {notice && <p className="inline-notice" role="status" style={{ marginBottom: '16px' }}>{notice}</p>}

        {/* Contenido de favoritos */}
        {favoriteMotos.length === 0 ? (
          <div className="empty-favorites-card">
            <div className="empty-favorites-icon">
              <Icon name="heart" size={42} />
            </div>
            <h2>Aún no tienes motos en favoritos</h2>
            <p>
              Explora nuestro catálogo y presiona el ícono del corazón en cualquier tarjeta para guardarla en esta sección.
            </p>
            <Link to="/" className="button button-primary" style={{ marginTop: '16px' }}>
              <Icon name="bike" size={18} /> Explorar Catálogo
            </Link>
          </div>
        ) : (
          <section className="favorites-content-section">
            {/* Barra de herramientas */}
            <div className="favorites-toolbar">
              <div className="favorites-counter">
                <strong>{filteredMotos.length}</strong> {filteredMotos.length === 1 ? 'moto encontrada' : 'motos encontradas'}
              </div>

              <div className="favorites-toolbar-actions">
                <label className="filter-select favorites-sort">
                  <span className="sr-only">Ordenar por</span>
                  <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                    <option value="default">Orden por defecto</option>
                    <option value="price-asc">Menor precio</option>
                    <option value="price-desc">Mayor precio</option>
                    <option value="rating">Mejor calificación</option>
                  </select>
                  <Icon name="chevron" size={15} />
                </label>

                {selected.length >= 2 && (
                  <button type="button" className="button button-primary button-small" onClick={handleGoToCompare}>
                    <Icon name="compare" size={16} /> Comparar seleccionadas ({selected.length})
                  </button>
                )}
              </div>
            </div>

            {/* Cuadrícula de motos */}
            <div className="moto-grid">
              {filteredMotos.map((moto) => (
                <FavoriteMotoCard
                  key={moto.id}
                  moto={moto}
                  selected={selected.includes(moto.id)}
                  onCompare={toggleCompare}
                  onFavorite={handleToggleFavorite}
                />
              ))}
            </div>

            {filteredMotos.length === 0 && (
              <div className="empty-state" style={{ marginTop: '20px' }}>
                No encontramos motos favoritas que coincidan con la búsqueda "{query}".
              </div>
            )}
          </section>
        )}
      </main>
    </WorkspaceLayout>
  )
}
