-- Trello: Integrante 3 — esquema inicial de usuarios para la futura conexión MySQL.
CREATE DATABASE IF NOT EXISTS comotos
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE comotos;

CREATE TABLE IF NOT EXISTS usuarios (
  id INT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(100) NOT NULL,
  correo VARCHAR(255) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  rol VARCHAR(30) NOT NULL DEFAULT 'usuario',
  creado_en TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_usuarios_correo (correo)
  
 
