# starting-swagger

Este proyecto pretende ser un proyecto guía para implementar una documentación OpenAPI (Swagger) para una pequeña parte de la API de Rick y Morty. La idea es que sirva como base para que los alumnos entiendan el proceso y lo apliquen a sus propios proyectos de API, como una API de gestión de reservas.

## Requisitos

- Node.js instalado en tu máquina.
- npm (Node Package Manager) instalado.

## Instalación

1. Clona este repositorio en tu máquina local:

   ```bash
   git clone <URL_DE_TU_REPOSITORIO> # Reemplaza con la URL real
   ```

2. Navega al directorio del proyecto:

   ```bash
   cd starting-swagger
   ```

3. Instala las dependencias del proyecto (Swagger UI y http-server):

   ```bash
   npm install
   ```

## Ejecución Local

Para iniciar la aplicación y visualizar la documentación de Swagger de forma local, ejecuta el siguiente comando:

```bash
npm start
```

Esto iniciará un servidor web simple (`http-server`) que servirá los archivos estáticos del proyecto. Podrás acceder a la documentación de Swagger en tu navegador, generalmente en una URL similar a:

```text
http://localhost:8080
```

(El puerto puede variar, el terminal te indicará el puerto exacto).

## Proceso de Build

Para preparar tu documentación de Swagger para el despliegue en un entorno de producción (como GitHub Pages), puedes generar un conjunto de archivos estáticos.

Ejecuta el siguiente comando:

```bash
npm run build
```

Este comando realizará lo siguiente:

1. Limpiará el directorio `dist` si existe.
2. Copiará `index.html` a la carpeta `dist`, ajustando las rutas de Swagger UI para producción.
3. Copiará `openapi.yaml` a la carpeta `dist`.
4. Copiará todos los archivos necesarios de `swagger-ui-dist` (CSS, JS, favicons) a `dist/swagger-ui-dist`.

El resultado será una carpeta `dist` que contendrá todos los archivos estáticos necesarios para servir tu documentación de Swagger.

**Nota:** Durante el desarrollo, `npm start` utiliza las rutas de `node_modules/swagger-ui-dist/`, mientras que el build genera archivos optimizados con rutas relativas para producción.

## Adaptando la OpenAPI a tu API de Gestión de Reservas

El objetivo de este proyecto es que aprendas a documentar tu propia API. Aquí te explicamos qué elementos tendrías que modificar para adaptar `openapi.yaml` a una API de gestión de reservas, por ejemplo:

1. **`openapi.yaml` (el corazón de tu documentación):**
   - **`info.title` y `info.description`:** Actualiza el título y la descripción para que reflejen tu API (e.g., "API de Gestión de Reservas de Hotel", "API para gestionar reservas, disponibilidad de habitaciones y datos de clientes").
   - **`servers.url`:** Cambia la URL base para que apunte a la URL de tu propia API (e.g., `https://api.tudominio.com/reservas`).
   - **`paths`:** Aquí es donde definirás tus propios endpoints.
     - Reemplaza `/character/{id}` con tus endpoints (e.g., `/reservas`, `/reservas/{id}`, `/clientes`, `/habitaciones`).
     - Define los métodos HTTP (GET, POST, PUT, DELETE) para cada path.
     - Actualiza `summary`, `description` y `parameters` para que coincidan con la lógica de tu API.
     - Especifica las `responses` con los códigos de estado HTTP apropiados (200 OK, 201 Created, 400 Bad Request, 404 Not Found, etc.) y los `schema` de tus objetos de respuesta.
   - **`components.schemas`:** Define los modelos de datos (schemas) para los objetos que tu API maneja (e.g., `Reserva`, `Cliente`, `Habitacion`). Estos esquemas describen la estructura de los datos que se envían y reciben.

   **Ejemplo de adaptación:**

   De (Rick & Morty):

   ```yaml
   paths:
     /character/{id}:
       get:
         summary: Obtener un personaje por ID
         parameters:
           - in: path
             name: id
             schema: { type: integer }
         responses:
           '200':
             description: Detalles del personaje.
             content:
               application/json:
                 schema:
                   $ref: '#/components/schemas/Character'
   ```

   A (Gestión de Reservas):

   ```yaml
   paths:
     /reservas/{id}:
       get:
         summary: Obtener una reserva por ID
         description: Recupera los detalles de una reserva específica usando su ID.
         parameters:
           - in: path
             name: id
             schema:
               type: string
               format: uuid
             required: true
             description: ID de la reserva a recuperar.
         responses:
           '200':
             description: Detalles de la reserva.
             content:
               application/json:
                 schema:
                   $ref: '#/components/schemas/Reserva'
           '404':
             description: Reserva no encontrada.
             # ... otros detalles de respuesta
   components:
     schemas:
       Reserva:
         type: object
         properties:
           id:
             type: string
             format: uuid
             example: "a1b2c3d4-e5f6-7890-1234-567890abcdef"
           clienteId:
             type: string
             format: uuid
           fechaEntrada:
             type: string
             format: date
           fechaSalida:
             type: string
             format: date
           estado:
             type: string
             enum: [ "confirmada", "pendiente", "cancelada" ]
             example: "confirmada"
           # ... más propiedades
   ```

## Subir a GitHub Pages

Una vez que hayas adaptado `openapi.yaml` y hayas generado los archivos estáticos con `npm run build`, puedes subirlos a GitHub Pages para tener tu documentación accesible online.

1. **Asegúrate de tener la rama `gh-pages`:**
   - Si no la tienes, puedes crearla y empujarla:

     ```bash
     git subtree push --prefix dist origin gh-pages
     ```

   - O bien, puedes configurar GitHub Pages para servir desde la carpeta `dist` de tu rama `main` (o `master`).

2. **Configura GitHub Pages:**
   - En tu repositorio de GitHub, ve a `Settings` > `Pages`.
   - En la sección "Build and deployment", elige `Deploy from a branch`.
   - Selecciona la rama `gh-pages` (o `main`/`master` y la carpeta `/dist`) y haz clic en `Save`.

3. **Accede a tu documentación:**
   - Después de unos minutos, tu documentación estará disponible en una URL como `https://<TU_USUARIO>.github.io/<TU_REPOSITORIO>/`.
