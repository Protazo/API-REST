# ANÁLISIS DEL DOMINIO - SISTEMA DE RESERVAS DE SALAS

## 1. Tablas de la base de datos que usaré

Para mi tabla de reservas necesito las tablas: 

- `reservas` (principal)
- `recursos` (por id_recurso)
- `usuarios` (por id_usuario)

## 2. Campos de la tabla `reservas` y mapeo a la API

| Campo           | Tipo      | ¿En API? | Razón                                               |
|-----------------|-----------|----------|-----------------------------------------------------|
| id_recurso      | INT (FK)  | SÍ       | Saber que recurso es reservado                      |
| id_reserva_local| INT       | SÍ       | Identificar la reserva junto a los otros IDs        |
| id_usuario      | INT (FK)  | SÍ       | Qué sala se reservó                                 |
| fecha           | DATE      | SÍ       | Saber que día se reserva                            |
| hora_inicio     | TIME      | SÍ       | A qué hora empieza                                  |
| hora_fin        | TIME      | SÍ       | A qué hora termina                                  |
| coste           | DOUBLE    | SÍ       | Saber el precio de la reserva                       |
| numnero_plazas  | INT       | SÍ       | Cantidad de plazas de la reserva                    |
| motivo          | VARCHAR   | SÍ       | Motivo de la reserva                                |
| observaciones   | VARCHAR   | SÍ       | Observaciones                                       |

Campos auto-generados por el backend:**

De estos campos, el backend generará automáticamente:

- `id_reserva_local` (se calcula con el número de reservas que haya con los mismos ids recurso y usuario)


**Información adicional que incluiré** (JOIN con tabla `recurso` y `usuario`):

Además de los campos de la tabla `reservas`, en las respuestas de la API incluiré el nombre del recurso y del usuario para facilitar la lectura. Para ello haré un JOIN con la tabla `recurso` y `usuario` y expondré el campo:

- `recurso_nombre`: Para mostrar el nombre del recurso.
- `usuario_nombre`: Para mostrar el nombre del usuario.

## 3. Validaciones principales

Al crear/modificar reservas validaré:

**Campos obligatorios:**

- `id_usuario`, `id_recurso`, `hora_inicio`, `hora_fin`, `fecha`, `numero_plazas`.

**Lógica:**

- `id_usuario` debe de existir y ser del tipo "normal"
- `id_recurso` debe de existir
- `hora_inicio` < `hora_fin`
- Las dos horas tienen que estar disponibles el ese recurso.
- `fecha` >= HOY (no permitir fechas pasadas)
- `numero_plazas` >= 1
- `numero_plazas` <= capacidad de la sala
- No puede haber solapamiento de horarios en la misma sala

## 4. Ejemplos de JSON

**REQUEST** (crear reserva):

La petición que el cliente enviaría para crear una reserva podría ser:

```json
{
  "id_recurso": 34,
  "id_usuario": 3,
  "fecha": "2026-07-07",
  "hora_inicio": "09:00",
  "hora_fin": "11:00",
  "numero_plazas": 8,
  "motivo": "Reunión del equipo",
  "observaciones": "Discutir nuevo proyecto"
}
```

**RESPONSE** (reserva creada):

La respuesta que el backend devolvería al crear la reserva incluiría los campos generados automáticamente y el nombre de la sala:

```json
{
  "id_recurso": 34,
  "id_reserva_local": 1,
  "id_usuario": 3,
  "fecha": "2026-07-07",
  "hora_inicio": "09:00",
  "hora_fin": "11:00",
  "numero_plazas": 8,
  "motivo": "Reunión del equipo",
  "observaciones": "Discutir nuevo proyecto"
}
```

## Conclusión

Necesito 10 campos de la tabla `reservas` y los uso todos en la API.
Voy a usar 8 validaciones para que los datos entren bien a la base de datos.
Esto me permitirá crear, modificar, borrar y actualizar reservas.