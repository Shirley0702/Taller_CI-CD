# Sistema Bibliotecario

Proyecto del taller de integración continua y entrega continua. Incluye una base de datos PostgreSQL ejecutada con Docker Compose y una API REST desarrollada con NestJS y TypeORM.

## Requisitos

- Node.js 20.11 o superior
- npm 10 o superior
- Docker Desktop

## Configuración

1. Copiar `.env.example` como `.env` y definir una contraseña local.
2. Levantar PostgreSQL desde la raíz del repositorio:

   ```powershell
   docker compose up -d
   ```

3. Instalar e iniciar el backend:

   ```powershell
   cd backend
   npm install
   npm run start:dev
   ```

La API queda disponible en `http://localhost:3000` y PostgreSQL en `localhost:5434`.

## Recurso Persona

| Método | Ruta | Acción |
| --- | --- | --- |
| `POST` | `/persona` | Crear una persona |
| `GET` | `/persona` | Listar personas |
| `GET` | `/persona/:id` | Consultar una persona por UUID |
| `PATCH` | `/persona/:id` | Actualizar una persona |
| `DELETE` | `/persona/:id` | Eliminar una persona |

El esquema SQL versionado se encuentra en `database/01_schema.sql`.
