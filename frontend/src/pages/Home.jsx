import { useMemo, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Icon from '../components/Icons.jsx'
import WorkspaceLayout from '../components/WorkspaceLayout.jsx'
import bmw from '../assets/bmw-r1250.jpg'
import yamaha from '../assets/yamaha-mt07.jpg'
import honda from '../assets/honda-cbr600rr.jpg'
import triumph from '../assets/triumph-street-twin.jpg'
import ktm from '../assets/ktm-390-duke.jpg'
import ducati from '../assets/ducati-multistrada.jpg'
import kawasaki from '../assets/kawasaki-ninja650.jpg'
import royal from '../assets/royal-enfield-scram.jpg'

const motos = [
  { id: 1, marca: 'BMW', modelo: 'R 1250 GS', precio: 24990000, anio: 2024, cilindraje: 1254, tipo: 'Aventura', image: bmw, rating: 4.8 },
  { id: 2, marca: 'Yamaha', modelo: 'MT-07', precio: 36500000, anio: 2024, cilindraje: 689, tipo: 'Naked', image: yamaha, rating: 4.7 },
  { id: 3, marca: 'Honda', modelo: 'CBR 600RR', precio: 48990000, anio: 2025, cilindraje: 599, tipo: 'Deportiva', image: honda, rating: 4.9 },
  { id: 4, marca: 'Triumph', modelo: 'Street Twin', precio: 32900000, anio: 2024, cilindraje: 900, tipo: 'Clásica', image: triumph, rating: 4.5 },
  { id: 5, marca: 'KTM', modelo: '390 Duke', precio: 22500000, anio: 2025, cilindraje: 399, tipo: 'Naked', image: ktm, rating: 4.6 },
  { id: 6, marca: 'Ducati', modelo: 'Multistrada V2', precio: 72990000, anio: 2025, cilindraje: 937, tipo: 'Aventura', image: ducati, rating: 4.8 },
  { id: 7, marca: 'Kawasaki', modelo: 'Ninja 650', precio: 34990000, anio: 2024, cilindraje: 649, tipo: 'Deportiva', image: kawasaki, rating: 4.6 },
  { id: 8, marca: 'Royal Enfield', modelo: 'Scram 411', precio: 16490000, anio: 2024, cilindraje: 411, tipo: 'Scrambler', image: royal, rating: 4.4 },
]

const money = (value) => `$ ${new Intl.NumberFormat('es-CO').format(value)}`

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

  const [favorites, setFavorites] = useState([])
  const [notice, setNotice] = useState('')

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
    setFavorites((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])
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