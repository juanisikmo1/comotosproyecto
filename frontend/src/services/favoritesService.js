// Servicio de favoritos
const FAVORITES_KEY = 'comotos_favorites'
const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api/v1'

export const favoritesService = {
  // Obtener lista de IDs favoritos
  getFavorites() {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  },

  // Guardar lista de IDs favoritos
  saveFavorites(ids) {
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(ids))
      window.dispatchEvent(new CustomEvent('comotos_favorites_changed', { detail: ids }))
    } catch (e) {
      console.error(e)
    }
  },

  // Alternar favorito (agregar o quitar)
  toggleFavorite(motoId) {
    const current = this.getFavorites()
    const id = Number(motoId)
    let updated
    const exists = current.includes(id)

    if (exists) {
      updated = current.filter((item) => item !== id)
    } else {
      updated = [...current, id]
    }

    this.saveFavorites(updated)
    this.syncWithBackend(id, !exists)
    return !exists
  },

  // Verificar si una moto es favorita
  isFavorite(motoId) {
    return this.getFavorites().includes(Number(motoId))
  },

  // Limpiar todos los favoritos
  clearFavorites() {
    this.saveFavorites([])
  },

  // Sincronizar con API si hay token
  async syncWithBackend(motoId, isAdd) {
    const token = sessionStorage.getItem('comotos_access_token')
    if (!token) return

    try {
      await fetch(`${API_URL}/favoritos/${motoId}`, {
        method: isAdd ? 'POST' : 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
    } catch {
      // Continuar con almacenamiento local
    }
  },
}
