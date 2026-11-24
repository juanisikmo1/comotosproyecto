# COMOTOS — Inicio, registro y sesión

Base de trabajo para desarrollar la primera experiencia de COMOTOS siguiendo el estilo del wireframe compartido: panel oscuro lateral, fondo crema, bordes beige y acentos dorados. Las imágenes de motos incluidas son recortes del wireframe del equipo y sirven como material demostrativo.

## Estructura

- `frontend/`: React, JavaScript, Vite, Tailwind y pantallas Inicio, Registro, Login y Panel.
- `backend/`: FastAPI, endpoints de autenticación, hashing Argon2 y token JWT.
- `database/schema.sql`: tabla inicial MySQL de usuarios.
- `docs/TRELLO_ESTILO_Y_AUTH.md`: asignaciones de Trello, criterios y checklist de la entrega.

## Frontend (PowerShell)

```powershell
cd frontend
npm install
npm run dev
```

Abre la dirección local que muestre Vite (normalmente `http://localhost:5173`).

## Backend (otra terminal)

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
Copy-Item .env.example .env
python -c "import secrets; print(secrets.token_hex(32))"
```

Copia el resultado del último comando y reemplaza el valor de `JWT_SECRET` en `backend/.env`. Luego ejecuta:

```powershell
uvicorn app.main:app --reload
```

Si el comando `uvicorn` no se reconoce, ejecuta `python -m uvicorn app.main:app --reload`.

Abre `http://127.0.0.1:8000/docs` para probar la API.

## Rutas iniciales

- `GET /api/v1/health`: salud del backend.
- `POST /api/v1/auth/register`: crea un usuario.
- `POST /api/v1/auth/login`: valida las credenciales y devuelve un JWT.

## Base de datos

Para una demostración local, el backend usa SQLite por defecto y crea `backend/comotos.db`. Para MySQL, el servidor debe estar instalado y la base `comotos` debe existir. Ejecuta `database/schema.sql` en MySQL y configura `DATABASE_URL` en `backend/.env`, por ejemplo:

```text
DATABASE_URL=mysql+pymysql://root:TU_PASSWORD@127.0.0.1:3306/comotos
```

Si usas una contraseña con caracteres especiales, codifícala correctamente en la URL. No compartas credenciales reales.

## Asignación de trabajo reflejada en comentarios

- Integrante 1: requisitos, flujo y criterios de aceptación; documenta las rutas y campos acordados.
- Integrante 2: diseño visual y frontend; Inicio, formularios, navegación y consumo de la API.
- Integrante 3: esquema de datos MySQL y validación de campos/relaciones.
- Integrante 4: backend FastAPI, esquemas, seguridad, registro e inicio de sesión.
- Integrante 5: pruebas de integración, errores, responsive y checklist de aceptación.

Los comentarios identifican a quién corresponde la tarjeta de Trello. La tarjeta solo debe moverse a Hecho cuando el responsable ejecute y valide la prueba correspondiente.

## Importante

Las tarjetas de motos de Inicio usan datos de prueba; todavía no se cargan desde MySQL. Este es un prototipo académico para desarrollo local, no una configuración lista para producción. Nunca subas `.env`, contraseñas, tokens, `node_modules`, `venv` o bases de datos locales a GitHub.
