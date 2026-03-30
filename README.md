# back-gob

Backend en **Node.js** y **TypeScript** para la gestión de entidades gubernamentales, usuarios con roles, formularios dinámicos (campos, temáticas) y captura de respuestas almacenadas como datos flexibles (JSON).API REST bajo el prefijo `/api/v1`.

---

## Stack tecnológico

| Área | Tecnología |
|------|------------|
| Runtime / lenguaje | Node.js, TypeScript (ES2022, módulos ES) |
| Framework HTTP | Express 4 |
| Base de datos | PostgreSQL |
| ORM | TypeORM 0.3 (DataSource, repositorios, migraciones, decoradores) |
| Validación de entrada | Zod 4 |
| Autenticación | JWT (`jsonwebtoken`, `express-jwt`) |
| Seguridad de contraseñas | bcrypt |
| Archivos | `express-fileupload` |
| Configuración | `dotenv` |

El proyecto usa `reflect-metadata` y decoradores de TypeORM (`experimentalDecorators`, `emitDecoratorMetadata` en `tsconfig.json`).

---

## Arquitectura

Se adopta una **arquitectura por capas** (estilo *layered / N-tier*), alineada con un patrón **MVC adaptado** para APIs REST:

```text
Cliente HTTP
    ↓
Express (middleware global: JSON, estáticos, CORS, JWT, subida de archivos)
    ↓
Routes (endpoints y verbos HTTP)
    ↓
Middleware de validación para datos (Zod) — solo donde aplica
    ↓
Controllers (orquestación HTTP: status codes, respuestas JSON)
    ↓
Services (lógica de aplicación y acceso a datos vía TypeORM Repository)
    ↓
Entities / PostgreSQL
```

- **`server.ts`**: arranque de la aplicación: inicializa `AppDataSource` (TypeORM) y luego `app.listen`.
- **`index.ts`**: construcción de `app`: middlewares, registro de routers, manejador global de errores (incluye respuesta para tokens JWT inválidos).


## Patrones de diseño y prácticas

| Patrón / práctica | Dónde se observa |
|-------------------|------------------|
| **Repository** (vía ORM) | Los servicios encapsulan `Repository<T>` de TypeORM; las entidades no exponen SQL directamente al controlador. |
| **Separación de responsabilidades** | Rutas, controladores centrados en HTTP, servicios con reglas y persistencia. |
| **Middleware de validación** | Factory `validateRequest(schema)` que devuelve un middleware Express; centraliza errores 400 con estructura de Zod. |
| **Inyección manual / composición simple** | Controladores instancian servicios en el constructor (`new UserService()`, etc.) |
| **DTO implícito** | Los cuerpos validados con Zod sustituyen `req.body` por el resultado tipado de `safeParse`. |
| **Middleware de autenticación** | `express-jwt` a nivel de aplicación con `unless` para rutas públicas (login, registro, raíz). |
| **Data Mapper / Active Record híbrido** | TypeORM mapea clases decoradas a tablas; las instancias son POCOs con metadatos. |
| **Barrel exports** | `entities/index.ts`, `routes/index.ts`, `utils/index.ts` agrupan exportaciones. |
| **Alias de rutas** | `@/*` apunta a `src/*` para imports consistentes. |

El manejo de errores global distingue `UnauthorizedError` (401) del resto (500), manteniendo una respuesta uniforme en JSON.

---

## Modelo de dominio (entidades)

Relación conceptual entre las principales tablas:

- **`Rol`**: rol del usuario (autorización a nivel de aplicación).
- **`GuvernmentEntity`**: ente gubernamental; puede tener jerarquía (`parentGubernment`, `isHaveSubGubernment`), usuarios, formularios e imagen opcional.
- **`User`**: pertenece a un `Rol` y a una `GuvernmentEntity`; incluye flag `active` y auditoría básica (`createdAt`).
- **`Form`**: formulario asociado a una entidad gubernamental; puede tener tópicos (`isHaveTopics`), periodo fiscal, periodo de actualización, y relaciones con `Field`, `Topic` y `FormData`.
- **`Topic`**: subdivisión opcional de un formulario; tiene sus propios `Field`.
- **`Field`**: definición de campo (clave, etiqueta, tipo, validaciones y opciones en JSON, orden, dependencias entre campos).
- **`FormData`**: respuesta enviada por un usuario a un formulario; el contenido dinámico va en columna **`jsonb`** `data`; enlaza `Form`, `Topic` opcional y `User`.

---

## API REST (prefijo `/api/v1`)

Routers registrados en `index.ts`:

| Prefijo | Módulo |
|---------|--------|
| `/auth` | Login y logout |
| `/user` | CRUD y listados de usuarios (registro público según configuración JWT) |
| `/guvernment-entity` | Entidades gubernamentales |
| `/form` | Formularios |
| `/form-data` | Envíos / datos de formulario |
| `/topic` | Temas |
| `/field` | Campos |
| `/rol` | Roles |
| `/upload` | Subida de archivos (p. ej. imagen de entidad) |

Rutas **públicas** respecto al JWT configurado: `GET /`, `POST /api/v1/auth/login`, `POST /api/v1/user/register` (revisar `index.ts` si se añaden más excepciones).

---

## Configuración y variables de entorno

Crear un archivo `.env` en la raíz del proyecto. Variables usadas en el código (ajustar nombres si tu despliegue difiere):
DB_HOST=''
DB_PORT=''
DB_USER=''
DB_PASSWORD=''
DB_NAME=''
PORT=''
JWT_SECRET=''
FRONTEND_URL=''
---

## Scripts npm

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Desarrollo con recarga: ejecuta **`src/server.ts`** (inicializa TypeORM y levanta el listener HTTP). |
| `npm run build` | Compilación TypeScript (`tsc`). **Nota:** en `tsconfig.json` actual está `noEmit: true`, por lo que el `build` no genera `dist/` hasta que se cambie esa opción o se use otra estrategia de emisión. |
| `npm start` | Según `package.json`, ejecuta `node dist/index.js`. **`index.ts` solo exporta la app Express**; quien conecta la base y llama a `listen` es **`server.ts`**. Para producción conviene alinear `start` con el archivo compilado equivalente a `server.ts` (p. ej. `node dist/server.js`) una vez que el build emita `dist/`. |
| `npm run migration:generate` | Genera migración (CLI TypeORM con `-d src/config/db.ts`). |
| `npm run migration:run` / `migration:revert` | Aplica o revierte migraciones. |
| `npm run generate:guvernment` / `generate:rol` / `update:lowercase` | Scripts de mantenimiento en `src/scripts/`. |

---

## Estructura de carpetas

```text
src/
├── config/          # DataSource TypeORM (db.ts)
├── controllers/     # Controladores HTTP
├── entities/        # Entidades TypeORM
├── migrations/      # Migraciones versionadas
├── routes/          # Routers Express por recurso
├── service/         # Lógica y acceso a datos
├── validations/     # Esquemas Zod y middleware validateRequest
├── utils/           # JWT, contraseñas, paginación, helpers
├── data/            # Tipos e interfaces (p. ej. estados)
├── scripts/         # Utilidades CLI
├── index.ts         # App Express
└── server.ts        # Bootstrap DB + listen
```

---

## Seguridad (resumen)

- Contraseñas hasheadas con **bcrypt** en flujos de registro/actualización (ver `utils/password.ts` y servicios de usuario).
- API protegida por defecto con **JWT**; el cliente debe enviar `Authorization: Bearer <token>`.
- Límite de tamaño en subida de archivos configurado en `express-fileupload` (5 MB en código actual).
Para entornos productivos, usar `JWT_SECRET` fuerte, HTTPS, y revisar políticas CORS acorde al front real.

---

---

## Licencia

ISC (según `package.json`).
