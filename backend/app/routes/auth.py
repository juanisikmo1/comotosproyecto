# Trello: Integrante 4 — endpoints POST de registro e inicio de sesión.
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.core.security import create_access_token, hash_password, verify_password
from app.database import get_db
from app.models.usuario import Usuario
from app.schemas.auth import (
    LoginRequest,
    LoginResponse,
    RegistroRequest,
    RegistroResponse,
)

router = APIRouter(tags=["Autenticación"])


@router.post("/register", response_model=RegistroResponse, status_code=status.HTTP_201_CREATED)
def registrar_usuario(data: RegistroRequest, db: Session = Depends(get_db)):
    correo = str(data.correo).strip().lower()
    existente = db.scalar(select(Usuario).where(Usuario.correo == correo))
    if existente:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Este correo ya está registrado.",
        )

    usuario = Usuario(
        nombre=data.nombre.strip(),
        correo=correo,
        password_hash=hash_password(data.password),
        rol="usuario",
    )
    db.add(usuario)
    try:
        db.commit()
        db.refresh(usuario)
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Este correo ya está registrado.",
        ) from None

    return {"mensaje": "Cuenta creada correctamente.", "usuario": usuario}


@router.post("/login", response_model=LoginResponse)
def iniciar_sesion(data: LoginRequest, db: Session = Depends(get_db)):
    correo = str(data.correo).strip().lower()
    usuario = db.scalar(select(Usuario).where(Usuario.correo == correo))

    if usuario is None or not verify_password(data.password, usuario.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Correo o contraseña incorrectos.",
        )

    return {
        "access_token": create_access_token(usuario.id),
        "token_type": "bearer",
        "usuario": usuario,
    }
