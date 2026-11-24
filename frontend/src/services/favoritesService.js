// Servicio de favoritos
const FAVORITES_KEY = 'comotos_favorites'
const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api/v1'

export const favoritesService = {
<<<<<<< HEAD
  // Obtener lista de IDs favoritos desde localStorage
=======
  // Obtener lista de IDs favoritos
>>>>>>> c9589814d17790c7267de7f4587919de5d38102e
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
<<<<<<< HEAD
    const current = this.getFavorites()
    this.saveFavorites([])
    // Sincronizar borrado con backend si hay sesión
    const token = sessionStorage.getItem('comotos_access_token')
    if (token) {
      current.forEach((id) => this.syncWithBackend(id, false))
    }
  },

  // Cargar favoritos desde la base de datos remota si el usuario está autenticado
  async fetchFromBackend() {
    const token = sessionStorage.getItem('comotos_access_token')
    if (!token) return this.getFavorites()

    try {
      const res = await fetch(`${API_URL}/favoritos/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (res.ok) {
        const data = await res.json()
        if (Array.isArray(data.favoritos)) {
          // Fusionar favoritos remotos con los locales para no perder nada
          const local = this.getFavorites()
          const merged = Array.from(new Set([...local, ...data.favoritos]))
          this.saveFavorites(merged)
          return merged
        }
      }
    } catch (e) {
      console.error('Error cargando favoritos del backend:', e)
    }
    return this.getFavorites()
=======
    this.saveFavorites([])
>>>>>>> c9589814d17790c7267de7f4587919de5d38102e
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
