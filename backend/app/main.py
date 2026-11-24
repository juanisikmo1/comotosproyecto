# Trello: Integrante 4 — configurar FastAPI, CORS y rutas de autenticación.
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine
<<<<<<< HEAD
from app.models import Favorito, Usuario  # Importa los modelos para registrar tablas con SQLAlchemy.
from app.routes.auth import router as auth_router
from app.routes.favoritos import router as favoritos_router
=======
from app.models import Usuario  # Importa el modelo para registrar la tabla con SQLAlchemy.
from app.routes.auth import router as auth_router
>>>>>>> c9589814d17790c7267de7f4587919de5d38102e


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Creación automática de tablas para la demostración local. Más adelante podemos usar migraciones.
    Base.metadata.create_all(bind=engine)
    yield


app = FastAPI(
    title="COMOTOS API",
    description="API inicial de registro e inicio de sesión de COMOTOS.",
    version="0.1.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=False,
<<<<<<< HEAD
    allow_methods=["GET", "POST", "DELETE", "OPTIONS"],
=======
    allow_methods=["GET", "POST", "OPTIONS"],
>>>>>>> c9589814d17790c7267de7f4587919de5d38102e
    allow_headers=["Content-Type", "Authorization"],
)

app.include_router(auth_router, prefix="/api/v1/auth")
<<<<<<< HEAD
app.include_router(favoritos_router, prefix="/api/v1/favoritos")
=======
>>>>>>> c9589814d17790c7267de7f4587919de5d38102e


@app.get("/")
def inicio():
    return {"mensaje": "API de COMOTOS funcionando", "documentacion": "/docs"}


@app.get("/api/v1/health", tags=["Sistema"])
def health():
    return {"estado": "ok", "servicio": "COMOTOS API"}
