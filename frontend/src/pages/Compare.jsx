import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
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

const motosData = [
  { id: 1, marca: 'BMW', modelo: 'R 1250 GS', precio: 24990000, anio: 2024, cilindraje: 1254, tipo: 'Aventura', image: bmw, rating: 4.8, potencia: '136 HP', peso: '249 kg', frenos: 'Disco Doble ABS', tanque: '20 L' },
  { id: 2, marca: 'Yamaha', modelo: 'MT-07', precio: 36500000, anio: 2024, cilindraje: 689, tipo: 'Naked', image: yamaha, rating: 4.7, potencia: '73.4 HP', peso: '184 kg', frenos: 'Disco Doble ABS', tanque: '14 L' },
  { id: 3, marca: 'Honda', modelo: 'CBR 600RR', precio: 48990000, anio: 2025, cilindraje: 599, tipo: 'Deportiva', image: honda, rating: 4.9, potencia: '121 HP', peso: '193 kg', frenos: 'Disco Doble C-ABS', tanque: '18 L' },
  { id: 4, marca: 'Triumph', modelo: 'Street Twin', precio: 32900000, anio: 2024, cilindraje: 900, tipo: 'Clásica', image: triumph, rating: 4.5, potencia: '65 HP', peso: '216 kg', frenos: 'Disco Único ABS', tanque: '12 L' },
  { id: 5, marca: 'KTM', modelo: '390 Duke', precio: 22500000, anio: 2025, cilindraje: 399, tipo: 'Naked', image: ktm, rating: 4.6, potencia: '44 HP', peso: '165 kg', frenos: 'Disco Único ABS Supermoto', tanque: '15 L' },
  { id: 6, marca: 'Ducati', modelo: 'Multistrada V2', precio: 72990000, anio: 2025, cilindraje: 937, tipo: 'Aventura', image: ducati, rating: 4.8, potencia: '113 HP', peso: '225 kg', frenos: 'Brembo Cornering ABS', tanque: '20 L' },
  { id: 7, marca: 'Kawasaki', modelo: 'Ninja 650', precio: 34990000, anio: 2024, cilindraje: 649, tipo: 'Deportiva', image: kawasaki, rating: 4.6, potencia: '68 HP', peso: '193 kg', frenos: 'Disco Doble ABS', tanque: '15 L' },
  { id: 8, marca: 'Royal Enfield', modelo: 'Scram 411', precio: 16490000, anio: 2024, cilindraje: 411, tipo: 'Scrambler', image: royal, rating: 4.4, potencia: '24.3 HP', peso: '185 kg', frenos: 'Disco Doble ABS Dual', tanque: '15 L' },
]

const money = (value) => `$ ${new Intl.NumberFormat('es-CO').format(value)}`

export default function Compare() {
  const [selectedIds, setSelectedIds] = useState(() => {
    try {
      const stored = localStorage.getItem('comotos_selected')
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    try {
      const stored = localStorage.getItem('comotos_selected')
      if (stored) {
        setSelectedIds(JSON.parse(stored))
      }
    } catch (e) {
      console.error(e)
    }
  }, [])

  const chosen = motosData.filter((m) => selectedIds.includes(m.id))

  function removeMoto(id) {
    const updated = selectedIds.filter((item) => item !== id)
    setSelectedIds(updated)
    localStorage.setItem('comotos_selected', JSON.stringify(updated))
  }

  function clearAll() {
    setSelectedIds([])
    localStorage.setItem('comotos_selected', JSON.stringify([]))
  }

  const cheapestId = chosen.length > 0 ? chosen.reduce((min, m) => m.precio < min.precio ? m : min, chosen[0])?.id : null
  const mostPowerfulId = chosen.length > 0 ? chosen.reduce((max, m) => parseFloat(m.potencia) > parseFloat(max.potencia) ? m : max, chosen[0])?.id : null
  const highestCcId = chosen.length > 0 ? chosen.reduce((max, m) => m.cilindraje > max.cilindraje ? m : max, chosen[0])?.id : null
  const bestRatingId = chosen.length > 0 ? chosen.reduce((max, m) => m.rating > max.rating ? m : max, chosen[0])?.id : null
  const lightestId = chosen.length > 0 ? chosen.reduce((min, m) => parseFloat(m.peso) < parseFloat(min.peso) ? m : min, chosen[0])?.id : null

  return (
    <WorkspaceLayout active="Comparar">
      <main className="workspace-content compare-page-container">
        <div className="page-title-row">
          <div>
            <span className="section-kicker">MÓDULO DE COMPARACIÓN DETALLADA</span>
            <h1>Comparativa de Motocicletas</h1>
            <p>Analiza frente a frente las especificaciones y descubre en qué destaca cada modelo.</p>
          </div>
          <div className="compare-top-buttons">
            {chosen.length > 0 && (
              <button type="button" className="button button-outline" onClick={clearAll}>
                <Icon name="trash" size={17} /> Limpiar comparación
              </button>
            )}
            <Link to="/" className="button button-primary">
              <Icon name="bike" size={17} /> Volver al catálogo
            </Link>
          </div>
        </div>

        {chosen.length < 2 ? (
          <div className="empty-compare-state">
            <Icon name="compare" size={48} />
            <h2>Necesitas al menos 2 motocicletas para comparar</h2>
            <p>Regresa al catálogo y selecciona los modelos que deseas comparar en detalle.</p>
            <Link to="/" className="button button-primary" style={{ marginTop: '16px' }}>
              Explorar Catálogo
            </Link>
          </div>
        ) : (
          <div className="compare-grid-wrapper">
            <table className="compare-full-table">
              <thead>
                <tr>
                  <th className="feature-col">Especificación</th>
                  {chosen.map((moto) => (
                    <th key={moto.id} className="moto-col">
                      <div className="compare-header-card">
                        <button
                          type="button"
                          className="remove-moto-btn"
                          onClick={() => removeMoto(moto.id)}
                          title={`Quitar ${moto.modelo}`}
                        >
                          <Icon name="close" size={16} />
                        </button>
                        <img src={moto.image} alt={`${moto.marca} ${moto.modelo}`} />
                        <h3>{moto.marca} {moto.modelo}</h3>
                        <span className="compare-price">{money(moto.precio)}</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="feature-label">🏆 Destacada / En qué es mejor</td>
                  {chosen.map((m) => {
                    let highlights = []
                    if (m.id === cheapestId) highlights.push('💰 Mejor Precio')
                    if (m.id === mostPowerfulId) highlights.push('⚡ Mayor Potencia')
                    if (m.id === highestCcId) highlights.push('🏍️ Mayor Cilindraje')
                    if (m.id === bestRatingId) highlights.push('⭐ Mejor Calificación')
                    if (m.id === lightestId) highlights.push('🪶 Más Ligera')
                    return (
                      <td key={m.id} style={{ background: '#fff9e6', fontWeight: '500', color: '#b27b00' }}>
                        {highlights.length > 0 ? highlights.join(' • ') : '—'}
                      </td>
                    )
                  })}
                </tr>
                <tr>
                  <td className="feature-label">Precio</td>
                  {chosen.map((m) => (
                    <td key={m.id} className={m.id === cheapestId ? 'highlight-cell' : ''}>
                      {money(m.precio)} {m.id === cheapestId && ' 🏷️'}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="feature-label">Cilindraje</td>
                  {chosen.map((m) => (
                    <td key={m.id} className={m.id === highestCcId ? 'highlight-cell' : ''}>
                      {m.cilindraje} cc {m.id === highestCcId && ' 🔥'}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="feature-label">Potencia</td>
                  {chosen.map((m) => (
                    <td key={m.id} className={m.id === mostPowerfulId ? 'highlight-cell' : ''}>
                      {m.potencia} {m.id === mostPowerfulId && ' ⚡'}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="feature-label">Tipo</td>
                  {chosen.map((m) => <td key={m.id}>{m.tipo}</td>)}
                </tr>
                <tr>
                  <td className="feature-label">Año</td>
                  {chosen.map((m) => <td key={m.id}>{m.anio}</td>)}
                </tr>
                <tr>
                  <td className="feature-label">Capacidad Tanque</td>
                  {chosen.map((m) => <td key={m.id}>{m.tanque}</td>)}
                </tr>
                <tr>
                  <td className="feature-label">Frenos</td>
                  {chosen.map((m) => <td key={m.id}>{m.frenos}</td>)}
                </tr>
                <tr>
                  <td className="feature-label">Peso</td>
                  {chosen.map((m) => (
                    <td key={m.id} className={m.id === lightestId ? 'highlight-cell' : ''}>
                      {m.peso} {m.id === lightestId && ' 🪶'}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="feature-label">Calificación</td>
                  {chosen.map((m) => (
                    <td key={m.id} className={m.id === bestRatingId ? 'highlight-cell' : ''}>
                      <span style={{ color: '#eca43a', fontWeight: 'bold' }}>★ {m.rating}</span> / 5.0 {m.id === bestRatingId && ' ⭐'}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </main>
    </WorkspaceLayout>
  )
}