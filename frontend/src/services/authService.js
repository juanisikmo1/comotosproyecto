// Trello: Integrante 2 — conectar formularios con la API de autenticación del Integrante 4.
const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api/v1'

async function postJson(path, body) {
  let response
  try {
    response = await fetch(`${API_URL}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
  } catch {
    throw new Error('No se pudo conectar con COMOTOS API. Verifica que FastAPI esté ejecutándose.')
  }

  const data = await response.json().catch(() => ({}))
  if (!response.ok) {
    const detail = data.detail
    const message = Array.isArray(detail)
      ? detail.map((item) => item.msg).join('. ')
      : detail || 'Ocurrió un error en la solicitud.'
    throw new Error(message)
  }
  return data
}

export const authService = {
  register: (payload) => postJson('/auth/register', payload),

  async login(payload) {
    const data = await postJson('/auth/login', payload)
    // Token de sesión para la demostración del proyecto.
    sessionStorage.setItem('comotos_access_token', data.access_token)
    sessionStorage.setItem('comotos_user', JSON.stringify(data.usuario))
    return data
  },

  getUser() {
    try {
      return JSON.parse(sessionStorage.getItem('comotos_user') || 'null')
    } catch {
      return null
    }
  },

  logout() {
    sessionStorage.removeItem('comotos_access_token')
    sessionStorage.removeItem('comotos_user')
  },
}
