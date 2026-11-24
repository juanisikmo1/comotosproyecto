# Rutas de favoritos
from fastapi import APIRouter, Depends, Header, HTTPException, status
from sqlalchemy import delete, select
from sqlalchemy.orm import Session

from app.core.security import decode_access_token
from app.database import get_db
from app.models.favorito import Favorito

router = APIRouter(tags=["Favoritos"])


# Obtener ID de usuario autenticado
def get_current_user_id(authorization: str | None = Header(default=None)) -> int:
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Autenticación requerida.",
        )
    token = authorization.split(" ")[1]
    user_id = decode_access_token(token)
    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token inválido o expirado.",
        )
    return user_id


# Listar IDs de motos favoritas
@router.get("/")
def listar_favoritos(
    user_id: int = Depends(get_current_user_id),
    db: Session = Depends(get_db),
):
    query = select(Favorito.moto_id).where(Favorito.usuario_id == user_id)
    favoritos = db.scalars(query).all()
    return {"favoritos": list(favoritos)}


# Agregar moto a favoritos
@router.post("/{moto_id}", status_code=status.HTTP_201_CREATED)
def agregar_favorito(
    moto_id: int,
    user_id: int = Depends(get_current_user_id),
    db: Session = Depends(get_db),
):
    existente = db.scalar(
        select(Favorito).where(
            Favorito.usuario_id == user_id,
            Favorito.moto_id == moto_id,
        )
    )
    if not existente:
        nuevo = Favorito(usuario_id=user_id, moto_id=moto_id)
        db.add(nuevo)
        db.commit()

    return {"mensaje": "Moto agregada a favoritos", "moto_id": moto_id}


# Quitar moto de favoritos
@router.delete("/{moto_id}")
def eliminar_favorito(
    moto_id: int,
    user_id: int = Depends(get_current_user_id),
    db: Session = Depends(get_db),
):
    db.execute(
        delete(Favorito).where(
            Favorito.usuario_id == user_id,
            Favorito.moto_id == moto_id,
        )
    )
    db.commit()
    return {"mensaje": "Moto eliminada de favoritos", "moto_id": moto_id}
