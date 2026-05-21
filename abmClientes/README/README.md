# AutoPremium — Luxury Car Rental

> Sistema de gestión operativa para empresas de alquiler de vehículos de lujo.

---

## Identificación

| | |
|---|---|
| **Nombre del proyecto** | AutoPremium Luxury Car Rental |
| **Tipo de trabajo** | Individual |
| **Autor** | Franco Urrets |
| **Inicio del proyecto** | 26 de septiembre de 2025 |

---

## Descripción técnica

### Propósito del desarrollo

AutoPremium es una aplicación web full-stack que centraliza la gestión operativa de una empresa de alquiler de vehículos de lujo. Reemplaza procesos manuales (planillas, cuadernos, WhatsApp) con un sistema digital trazable que cubre el ciclo completo: alta de clientes y vehículos, creación de contratos de alquiler, control de disponibilidad en tiempo real, registro de devoluciones con cálculo automático de totales y métricas del negocio en un dashboard.

### Problemática que resuelve

Las empresas pequeñas del segmento premium de alquiler de vehículos operan sin herramientas digitales especializadas. Esto genera:

- **Double-booking**: sin control de disponibilidad, el mismo vehículo puede asignarse a dos clientes simultáneamente.
- **Pérdida de historial**: sin base de datos, el historial de un cliente y sus alquileres se dispersa en archivos locales.
- **Sin visibilidad financiera**: no hay forma ágil de conocer los ingresos del mes o la cantidad de contratos activos.
- **Sin presencia digital**: el potencial cliente no puede conocer la empresa ni consultar la flota desde internet.

### Perfil de usuario

El sistema está diseñado para un único tipo de usuario: el **operador administrativo** (rol `admin`) de la empresa — la persona encargada de gestionar reservas, registrar devoluciones, dar de alta clientes y vehículos, y consultar el estado general del negocio. No requiere conocimientos técnicos avanzados.

---
aaaaaaaaaaaa
## Guía de Instalación

### Requisitos previos

- **Node.js** v18 o superior
- **npm** v9 o superior
- **MySQL** 8+ _(solo si se usa modo base de datos; no requerido para modo demo)_

---

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/autopremium.git
cd autopremium/abmClientes
```

---

### 2. Configurar variables de entorno del backend

Crear el archivo `.env` en la raíz de `abmClientes/` (al lado de `package.json`):

```env
# Puerto del servidor
PORT=3000

# Credenciales de administrador
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123

# Clave secreta para JWT
JWT_SECRET=cambia_esto_en_produccion

# Modo demo (sin base de datos). Cambiar a false para usar MySQL.
USE_JSON_DATA=true

# Solo necesario si USE_JSON_DATA=false:
DB_HOST=localhost
DB_PORT=3306
DB_NAME=autopremium
DB_USER=root
DB_PASSWORD=tu_password
```

> Con `USE_JSON_DATA=true` el sistema arranca sin ninguna base de datos — ideal para demo o desarrollo rápido.

---

### 3. Instalar y ejecutar el backend

```bash
# Desde abmClientes/
npm install
npm run dev
```

El servidor quedará disponible en `http://localhost:3000`.

> Si usás `USE_JSON_DATA=false`, primero creá la base de datos en MySQL y luego ejecutá las migraciones:
> ```bash
> npm run db:migrate
> ```

---

### 4. Instalar y ejecutar el frontend

```bash
cd frontEnd
npm install
npm run dev
```

El frontend quedará disponible en `http://localhost:5173`.

---

### 5. Ingresar al sistema

Abrí `http://localhost:5173` en el navegador.

Desde la landing pública, hacé clic en **Ingresar** y usá las credenciales configuradas en `.env`:

| Campo | Valor por defecto |
|---|---|
| Usuario | `admin` |
| Contraseña | `admin123` |

---

### Scripts disponibles

#### Backend (`abmClientes/`)

| Comando | Descripción |
|---|---|
| `npm run dev` | Inicia el servidor con Nodemon (recarga automática) |
| `npm start` | Inicia el servidor en modo producción |

#### Frontend (`abmClientes/frontEnd/`)

| Comando | Descripción |
|---|---|
| `npm run dev` | Inicia Vite en modo desarrollo con HMR |
| `npm run build` | Genera el bundle de producción en `dist/` |

