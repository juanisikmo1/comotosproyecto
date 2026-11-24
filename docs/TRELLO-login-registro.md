# Sprint: Inicio, registro e inicio de sesión

## Integrante 1 - Contrato y documentación
- [ ] Acordar campos: nombre, correo, password.
- [ ] Documentar rutas y respuestas.
- [ ] Registrar criterios de aceptación.

## Integrante 2 - Frontend
- [ ] Crear pantalla de inicio.
- [ ] Crear pantalla de registro.
- [ ] Crear pantalla de login.
- [ ] Mostrar validaciones y errores de API.
- [ ] Verificar diseño responsive.

## Integrante 3 - Base de datos
- [ ] Revisar/ejecutar `database/schema.sql` en MySQL cuando esté disponible.
- [ ] Confirmar campos de `usuarios`.
- [ ] Confirmar correo único.

## Integrante 4 - Backend
- [ ] Crear entorno virtual e instalar `requirements.txt`.
- [ ] Configurar `backend/.env`.
- [ ] Implementar `POST /api/v1/auth/register`.
- [ ] Implementar `POST /api/v1/auth/login`.
- [ ] Verificar hash de contraseñas y JWT.
- [ ] Probar en `/docs`.

## Integrante 5 - QA e integración
- [ ] Probar registro válido.
- [ ] Probar correo duplicado.
- [ ] Probar login válido.
- [ ] Probar contraseña incorrecta.
- [ ] Probar formulario desde el frontend.
- [ ] Registrar problemas y evidencias.

## Criterios de aceptación
- Frontend inicia sin errores.
- Registro válido crea un usuario.
- Repetir correo produce un error comprensible.
- El login válido crea un token y lleva a `/panel`.
- Las credenciales incorrectas no permiten iniciar sesión.
- El hash de la contraseña no se devuelve en ninguna respuesta.
