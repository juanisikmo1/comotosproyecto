# Trello: Integrante 4 — hashing de contraseñas y generación de token de sesión.
import os
from datetime import datetime, timedelta, timezone

import jwt
from dotenv import load_dotenv
from pwdlib import PasswordHash

load_dotenv()
password_hasher = PasswordHash.recommended()
JWT_SECRET = os.getenv("JWT_SECRET", "solo-desarrollo-cambiar-antes-de-publicar")
JWT_ALGORITHM = "HS256"
TOKEN_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "60"))


def hash_password(password: str) -> str:
    return password_hasher.hash(password)


def verify_password(password: str, password_hash: str) -> bool:
    return password_hasher.verify(password, password_hash)


def create_access_token(user_id: int) -> str:
    expires_at = datetime.now(timezone.utc) + timedelta(minutes=TOKEN_MINUTES)
    payload = {"sub": str(user_id), "exp": expires_at}
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)
<<<<<<< HEAD


def decode_access_token(token: str) -> int | None:
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        user_id = payload.get("sub")
        return int(user_id) if user_id else None
    except (jwt.PyJWTError, ValueError):
        return None
=======
>>>>>>> c9589814d17790c7267de7f4587919de5d38102e
