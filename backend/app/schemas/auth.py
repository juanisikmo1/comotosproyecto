# Trello: Integrante 4 — definir datos de entrada y respuestas públicas de autenticación.
from pydantic import BaseModel, ConfigDict, EmailStr, Field, field_validator


class RegistroRequest(BaseModel):
    nombre: str = Field(min_length=2, max_length=100)
    correo: EmailStr
    password: str = Field(min_length=8, max_length=128)

    @field_validator("nombre")
    @classmethod
    def validar_nombre(cls, value: str) -> str:
        value = value.strip()
        if len(value) < 2:
            raise ValueError("El nombre debe tener al menos 2 caracteres.")
        return value


class LoginRequest(BaseModel):
    correo: EmailStr
    password: str = Field(min_length=1, max_length=128)


class UsuarioPublico(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    nombre: str
    correo: EmailStr
    rol: str


class RegistroResponse(BaseModel):
    mensaje: str
    usuario: UsuarioPublico


class LoginResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    usuario: UsuarioPublico
