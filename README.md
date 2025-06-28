# Parking Lot Manual ORM

Este proyecto es un backend para la gestión de parqueaderos, implementado en Node.js con un ORM manual. Permite administrar usuarios, vehículos, celdas, accesos, historial, incidencias y restricciones de pico y placa, todo a través de modelos y endpoints REST.

## Descripción General
- **Tecnologías:** Node.js, Express, MySQL/PostgreSQL/Supabase
- **Estructura:** Modelos ORM manuales, rutas REST, pruebas unitarias
- **Funcionalidad:** CRUD completo para todas las entidades principales del parqueadero

## Modelos Principales
- **Usuario:** Información de usuarios
- **Vehiculo:** Vehículos registrados
- **Celda:** Espacios de parqueo
- **AccesoSalida:** Entradas y salidas de vehículos
- **PerfilUsuario, PicoPlaca, Incidencia, ReporteIncidencia, HistorialParqueo**

## Endpoints de la API de Usuario
Base URL: `/api/usuarios`

### 1. Obtener todos los usuarios
- **GET** `/api/usuarios`
- **Respuesta:** Array de usuarios
```json
[
  {
    "id_usuario": 1,
    "tipo_documento": "CC",
    "numero_documento": "123456789",
    "primer_nombre": "Juan",
    "segundo_nombre": "Carlos",
    "primer_apellido": "Pérez",
    "segundo_apellido": "Lopez",
    "direccion_correo": "juan@email.com",
    "numero_celular": "3001234567",
    "foto_perfil": "img/juan.jpg",
    "estado": "activo",
    "clave": "...",
    "perfil_usuario_id": 3
  },
  ...
]
```

### 2. Obtener usuario por ID
- **GET** `/api/usuarios/:id`
- **Respuesta exitosa:** Usuario en formato JSON
- **Respuesta error:** `{ "error": "Usuario no encontrado" }`

### 3. Obtener usuario por número de documento
- **GET** `/api/usuarios/documento/:numero`
- **Respuesta exitosa:** Usuario en formato JSON
- **Respuesta error:** `{ "error": "Usuario no encontrado" }`

### 4. Crear un nuevo usuario
- **POST** `/api/usuarios`
- **Body (JSON):**
```json
{
  "tipo_documento": "CC",
  "numero_documento": "123456789",
  "primer_nombre": "Juan",
  "segundo_nombre": "Carlos",
  "primer_apellido": "Pérez",
  "segundo_apellido": "Lopez",
  "direccion_correo": "juan@email.com",
  "numero_celular": "3001234567",
  "foto_perfil": "img/juan.jpg",
  "estado": "activo",
  "clave": "password123",
  "perfil_usuario_id": 3
}
```
- **Respuesta exitosa:** Usuario creado (JSON)
- **Respuesta error:** `{ "error": "<mensaje>" }`

### 5. Actualizar usuario por ID
- **PUT** `/api/usuarios/:id`
- **Body (JSON):** Cualquier campo editable del usuario
- **Respuesta exitosa:** Usuario actualizado (JSON)
- **Respuesta error:** `{ "error": "Usuario no encontrado" }`

### 6. Eliminar usuario por ID
- **DELETE** `/api/usuarios/:id`
- **Respuesta exitosa:** `{ "mensaje": "Usuario eliminado" }`
- **Respuesta error:** `{ "error": "Usuario no encontrado" }`

## Estructura de Respuesta de Usuario
```json
{
  "id_usuario": 1,
  "tipo_documento": "CC",
  "numero_documento": "123456789",
  "primer_nombre": "Juan",
  "segundo_nombre": "Carlos",
  "primer_apellido": "Pérez",
  "segundo_apellido": "Lopez",
  "direccion_correo": "juan@email.com",
  "numero_celular": "3001234567",
  "foto_perfil": "img/juan.jpg",
  "estado": "activo",
  "clave": "...",
  "perfil_usuario_id": 3
}
```

## Endpoints de la API de Vehículo
Base URL: `/api/vehiculos`

### 1. Obtener todos los vehículos
- **GET** `/api/vehiculos`
- **Respuesta:** Array de vehículos
```json
[
  {
    "id": 1,
    "placa": "ABC123",
    "color": "Rojo",
    "modelo": "2020",
    "marca": "Toyota",
    "tipo": "Carro",
    "usuario_id_usuario": 2
  },
  ...
]
```

### 2. Obtener vehículo por ID
- **GET** `/api/vehiculos/:id`
- **Respuesta exitosa:** Vehículo en formato JSON
- **Respuesta error:** `{ "error": "Vehículo no encontrado" }`

### 3. Obtener vehículo por placa
- **GET** `/api/vehiculos/placa/:placa`
- **Respuesta exitosa:** Vehículo en formato JSON
- **Respuesta error:** `{ "error": "Vehículo no encontrado" }`

### 4. Obtener vehículos por usuario
- **GET** `/api/vehiculos/usuario/:usuario_id`
- **Respuesta:** Array de vehículos asociados al usuario

### 5. Crear un nuevo vehículo
- **POST** `/api/vehiculos`
- **Body (JSON):**
```json
{
  "placa": "ABC123",
  "color": "Rojo",
  "modelo": "2020",
  "marca": "Toyota",
  "tipo": "Carro",
  "usuario_id_usuario": 2
}
```
- **Respuesta exitosa:** Vehículo creado (JSON)
- **Respuesta error:** `{ "error": "<mensaje>" }`

### 6. Actualizar vehículo por ID
- **PUT** `/api/vehiculos/:id`
- **Body (JSON):** Cualquier campo editable del vehículo
- **Respuesta exitosa:** Vehículo actualizado (JSON)
- **Respuesta error:** `{ "error": "Vehículo no encontrado" }`

### 7. Eliminar vehículo por ID
- **DELETE** `/api/vehiculos/:id`
- **Respuesta exitosa:** `{ "mensaje": "Vehículo eliminado" }`
- **Respuesta error:** `{ "error": "Vehículo no encontrado" }`

## Endpoints de la API de Reporte de Incidencia
Base URL: `/api/reportes-incidencia`

### 1. Crear un nuevo reporte de incidencia
- **POST** `/api/reportes-incidencia`
- **Body (JSON):**
```json
{
  "vehiculo_id": 1,
  "incidencia_id": 2,
  "fecha_hora": "2025-06-27 10:00:00"
}
```
- **Respuesta exitosa:** Reporte creado (JSON)
- **Respuesta error:** `{ "error": "<mensaje>" }`

### 2. Obtener todos los reportes de incidencia
- **GET** `/api/reportes-incidencia`
- **Respuesta:** Array de reportes

### 3. Obtener reportes por IDs de vehículo e incidencia
- **GET** `/api/reportes-incidencia/by-ids?vehiculo_id=1&incidencia_id=2`
- **Respuesta:** Array de reportes que coinciden

### 4. Obtener reportes por ID de vehículo
- **GET** `/api/reportes-incidencia/vehiculo/:vehiculo_id`
- **Respuesta:** Array de reportes asociados al vehículo

### 5. Obtener reportes por ID de incidencia
- **GET** `/api/reportes-incidencia/incidencia/:incidencia_id`
- **Respuesta:** Array de reportes asociados a la incidencia

### 6. Obtener reportes por rango de fechas
- **GET** `/api/reportes-incidencia/rango-fechas?fechaInicio=2025-06-01&fechaFin=2025-06-27`
- **Respuesta:** Array de reportes en el rango de fechas

### 7. Actualizar un reporte de incidencia
- **PUT** `/api/reportes-incidencia`
- **Body (JSON):**
```json
{
  "vehiculo_id": 1,
  "incidencia_id": 2,
  "fecha_hora": "2025-06-27 12:00:00"
}
```
- **Respuesta exitosa:** Reporte actualizado (JSON)
- **Respuesta error:** `{ "error": "<mensaje>" }`

### 8. Eliminar un reporte de incidencia por IDs
- **DELETE** `/api/reportes-incidencia`
- **Body (JSON):**
```json
{
  "vehiculo_id": 1,
  "incidencia_id": 2
}
```
- **Respuesta exitosa:** `{ "success": true }`
- **Respuesta error:** `{ "error": "<mensaje>" }`

### 9. Eliminar todos los reportes de un vehículo
- **DELETE** `/api/reportes-incidencia/vehiculo/:vehiculo_id`
- **Respuesta exitosa:** `{ "success": true }`
- **Respuesta error:** `{ "error": "<mensaje>" }`

## Estructura de Respuesta de Reporte de Incidencia
```json
{
  "vehiculo_id": 1,
  "incidencia_id": 2,
  "fecha_hora": "2025-06-27 10:00:00"
}
```

## Pruebas y Ejecución
- Ejecuta `npm install` para instalar dependencias
- Inicia el servidor con `npm start`
- Ejecuta pruebas unitarias con `npm test`

## Notas
- Configura la conexión a la base de datos en `DatabaseConnection.js`
- Consulta el archivo `example-orm-usage.js` para ejemplos prácticos de uso
- El sistema incluye validaciones y manejo de errores detallado
