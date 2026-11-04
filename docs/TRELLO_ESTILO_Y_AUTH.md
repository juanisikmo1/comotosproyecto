# COMOTOS — archivos de UI y asignación Trello

Esta entrega ajusta la interfaz al lenguaje visual del wireframe compartido: barra lateral carbón, fondo crema, bordes beige finos, tarjetas de motocicletas, botones dorados y formularios con fondos cálidos. Las imágenes de motocicletas incluidas son recortes del wireframe aportado por el equipo y se usan como recursos demostrativos.

## Asignación propuesta por tarjeta

- **Integrante 1 — Requisitos y flujo:** revisar criterios de aceptación, nombres de campos y rutas; documentar cómo debe funcionar el registro y login.
- **Integrante 2 — Frontend/UI:** `frontend/src/App.jsx`, `frontend/src/index.css`, `frontend/src/components/Icons.jsx`, `frontend/src/components/WorkspaceLayout.jsx`, `frontend/src/components/AuthLayout.jsx`, `frontend/src/pages/Home.jsx`, `frontend/src/pages/Login.jsx`, `frontend/src/pages/Register.jsx`, `frontend/src/pages/Dashboard.jsx`, `frontend/src/services/authService.js`.
- **Integrante 3 — Base de datos:** `database/schema.sql`; definir tabla `usuarios` y coordinar si el entorno local usará SQLite de demostración o MySQL del equipo.
- **Integrante 4 — Backend:** `backend/app/main.py`, `backend/app/database.py`, `backend/app/core/security.py`, `backend/app/routes/auth.py`, `backend/app/schemas/auth.py`, `backend/app/models/usuario.py`, `backend/requirements.txt`.
- **Integrante 5 — QA/integración:** revisar el flujo Inicio → Registro → Login → Panel, probar errores, responsividad y documentar resultados.

> Los comentarios en los archivos indican la tarea/responsabilidad de Trello prevista; no certifican que cada tarea esté revisada por su integrante. Marcar cada tarjeta como terminada después de ejecutar las pruebas y confirmar con quien sea responsable.

## Demostración actual

- Inicio: tarjetas con datos estáticos de demostración, filtros por marca/tipo y selección de motos para comparación rápida.
- Registro: validación del formulario y solicitud a `POST /api/v1/auth/register`.
- Login: solicitud a `POST /api/v1/auth/login`, almacenamiento temporal de token en `sessionStorage` y entrada al panel.
- Backend: FastAPI; por defecto usa SQLite local si no se configura `DATABASE_URL`.
- MySQL: el script de tabla inicial de usuarios se encuentra en `database/schema.sql`. La conexión a MySQL sigue siendo un ajuste de entorno y debe verificarse antes de declarar integrada la base de datos final.

## Comprobaciones antes de marcar Done

1. `cd frontend; npm install; npm run dev`
2. En otra terminal: `cd backend; python -m venv .venv; .\.venv\Scripts\Activate.ps1; pip install -r requirements.txt; Copy-Item .env.example .env; uvicorn app.main:app --reload`
3. Probar `http://127.0.0.1:8000/docs`.
4. Registrar un correo nuevo, probar login, probar correo duplicado y contraseña incorrecta.
5. Revisar pantalla en desktop y móvil.
6. Confirmar que `.env`, base local y entornos virtuales no se suben a GitHub.
