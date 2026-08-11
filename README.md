# Backend - Proyecto Visitas

API NestJS + TypeORM + PostgreSQL. Endpoints en `/usuarios` (CRUD + sumar visitas).

## Variables de entorno (`.env`)

```
PORT=3000
DB_HOST=
DB_PORT=5432
DB_NAME=
DB_SCHEMA=visitas
DB_USER=
DB_PASSWORD=
DB_SSL=true
FRONTEND_URL=https://tu-frontend.vercel.app
```

`DB_SSL=true` es obligatorio para bases de datos en la nube (Render Postgres, Supabase). En local con Postgres sin SSL, usar `DB_SSL=false` o dejarlo vacío.

## Correr localmente

```bash
npm install
npm run start:dev
```

## Desplegar en Render

1. Sube este repositorio (o la carpeta `backend`) a GitHub.
2. En Render: **New > Web Service**, conecta el repo.
3. Root Directory: déjalo vacío (este repo ya es la raíz del backend; no uses `backend` aquí).
4. Build Command: `npm install && npm run build`
5. Start Command: `npm run start:prod`
6. Agrega las variables de entorno de la sección anterior en **Environment** (usa los datos de tu base de datos: Render Postgres o Supabase). Marca `DB_SSL=true`.
7. Deploy. Al finalizar, Render entrega una URL pública, por ejemplo `https://visitas-backend.onrender.com`.
8. Prueba: `POST https://visitas-backend.onrender.com/usuarios` con `{ "username": "rocio" }`.

El archivo `render.yaml` en esta carpeta ya define el servicio (Blueprint) por si prefieres desplegar con "New > Blueprint".

## Crear la base de datos

Ejecuta `db/schema.sql` (en la raíz del proyecto) contra tu instancia de PostgreSQL antes de desplegar, o deja `synchronize: true` (ya activo) para que TypeORM cree la tabla automáticamente en el primer arranque.

## Endpoints

| Método | Ruta                  | Descripción                |
|--------|-----------------------|-----------------------------|
| POST   | /usuarios              | Registrar usuario            |
| GET    | /usuarios              | Listar usuarios              |
| GET    | /usuarios/:id          | Obtener un usuario           |
| PUT    | /usuarios/:id          | Actualizar usuario           |
| DELETE | /usuarios/:id          | Eliminar usuario             |
| PATCH  | /usuarios/:id/visitas  | Sumar visitas (`{ "cantidad": 1 }`) |
