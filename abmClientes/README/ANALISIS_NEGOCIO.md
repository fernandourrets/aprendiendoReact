# AutoPremium — Análisis de Negocio y Definición del Producto

---

## 1. Unidad de Negocio

### 1.1 Nombre y actividad

**AutoPremium Luxury Car Rental** es una empresa de alquiler de vehículos de lujo ubicada en **Córdoba, Argentina**. Su actividad principal es la cesión temporal de automóviles premium (sedanes de lujo, SUV premium, deportivos) a clientes que requieren un vehículo de alta gama por períodos determinados, a cambio de un precio diario acordado.

### 1.2 Modelo de negocio

| Elemento | Descripción |
|---|---|
| **Actividad** | Alquiler de vehículos de lujo por día |
| **Fuente de ingreso** | Tarifa diaria (`precioPorDia`) × días efectivos de uso |
| **Segmento de precio** | Premium / lujo (no compite por precio bajo) |
| **Operación** | Presencial + gestión digital interna |
| **Cobertura geográfica** | Córdoba, Argentina (con potencial de expansión) |

### 1.3 Estructura operativa actual

La empresa administra tres entidades centrales:

```
CLIENTE
  ├── tiene uno o más VEHÍCULOS registrados (propiedad o seguimiento)
  └── genera uno o más ALQUILERES
        ├── asociado a un VEHÍCULO específico
        ├── con fecha de inicio, fin previsto y precio por día
        ├── estado: activo → finalizado (con devolución) o cancelado
        └── total calculado al momento de la devolución
```

### 1.4 Ciclo operativo de un alquiler

```
1. Alta de cliente (DNI, nombre, apellido, email, celular)
2. Alta de vehículo (tipo → marca → modelo → patente + año + propietario opcional)
3. Creación del alquiler (cliente + vehículo disponible + fechas + $/día)
4. Vehículo queda marcado como NO disponible (con alquiler activo)
5. Registro de devolución → se calcula el total (días reales × $/día)
6. Estado pasa a "finalizado" → vehículo vuelve a estar disponible
   ─ O ─
   Cancelación → estado "cancelado" → vehículo queda disponible
```

---

## 2. Estructura del Sistema

### 2.1 Arquitectura general

El sistema es una aplicación web de **arquitectura cliente-servidor (SPA + REST API)**:

```
┌─────────────────────────────────────────────────────┐
│                    NAVEGADOR WEB                    │
│                                                     │
│  React 18 (SPA)  ─── React Router v7               │
│  Tailwind CSS v4 ─── Vite (bundler)                 │
│  Lucide React    ─── Inter Variable (fuente)        │
└──────────────────────────┬──────────────────────────┘
                           │  HTTP / REST (JSON)
                           │  Authorization: Bearer JWT
┌──────────────────────────▼──────────────────────────┐
│                   SERVIDOR NODE.JS                  │
│                                                     │
│  Express.js  ─── Morgan (logging)                   │
│  JWT (jsonwebtoken) ─── dotenv                      │
│  Capa de repositorio con doble implementación:      │
│    · Modo JSON  (USE_JSON_DATA=true, sin DB)        │
│    · Modo DB    (Sequelize ORM + MySQL)             │
└──────────────────────────┬──────────────────────────┘
                           │
                    ┌──────▼──────┐
                    │   MySQL DB  │
                    │  Sequelize  │
                    └─────────────┘
```

### 2.2 Módulos del backend

| Módulo | Ruta API | Operaciones |
|---|---|---|
| **Autenticación** | `POST /api/auth/login` | Login con usuario/contraseña → JWT (8h) |
| **Clientes** | `/api/clientes` | CRUD completo (listar, obtener, crear, actualizar, eliminar) |
| **Vehículos** | `/api/vehiculos` | CRUD + filtro por disponibilidad |
| **Catálogos** | `GET /api/catalogos/tipos` | Árbol tipo → marca → modelo (para dropdowns en cascada) |
| **Alquileres** | `/api/alquileres` | CRUD + acciones: devolver, cancelar |
| **Dashboard** | `GET /api/dashboard` | Métricas agregadas en tiempo real |

### 2.3 Modelo de datos

**Tabla `clientes`**
| Campo | Tipo | Descripción |
|---|---|---|
| `id` | INT PK | Identificador único |
| `dni` | BIGINT | Documento nacional de identidad |
| `nombre` | STRING | Nombre del cliente |
| `apellido` | STRING | Apellido del cliente |
| `email` | STRING | Correo electrónico |
| `celular` | BIGINT | Número de contacto |

**Tabla `vehiculos`**
| Campo | Tipo | Descripción |
|---|---|---|
| `id` | INT PK | Identificador único |
| `patente` | STRING | Dominio/placa del vehículo |
| `año` | INT | Año de fabricación |
| `modeloVehiculoId` | FK | → `modeloVehiculos` |
| `clienteId` | FK (opcional) | → `clientes` (propietario registrado) |

**Jerarquía de catálogo de vehículos:**
```
tipoVehiculos  →  marcaVehiculos  →  modeloVehiculos  →  vehiculos
   (ej: SUV)     (ej: Toyota)      (ej: Hilux)
```

**Tabla `alquileres`**
| Campo | Tipo | Descripción |
|---|---|---|
| `id` | INT PK | Identificador único |
| `clienteId` | FK | → `clientes` |
| `vehiculoId` | FK | → `vehiculos` |
| `fechaInicio` | DATEONLY | Inicio del contrato |
| `fechaFinPrevista` | DATEONLY | Fecha pactada de devolución |
| `fechaDevolucion` | DATEONLY (null) | Fecha real de devolución |
| `precioPorDia` | DECIMAL(10,2) | Tarifa acordada |
| `totalCalculado` | DECIMAL(10,2) | Calculado al devolver: días × $/día |
| `estado` | ENUM | `activo` / `finalizado` / `cancelado` |
| `observaciones` | TEXT (null) | Notas libres del contrato |

### 2.4 Módulos del frontend

| Pantalla | Ruta | Descripción |
|---|---|---|
| **Landing pública** | `/` | Presentación de la empresa, flota, features, CTA |
| **Login** | `/login` | Autenticación con usuario + contraseña |
| **Dashboard** | `/admin` | Métricas: alquileres activos, ingresos del mes, nuevos del mes, vencidos, flota disponible, total clientes |
| **Lista de clientes** | `/admin/clientes` | Grid de tarjetas con filtro por categoría y búsqueda por apellido |
| **Detalle de cliente** | `/admin/clientes/:id` | Datos del cliente, vehículos asociados, historial de alquileres |
| **Formulario cliente** | `/admin/clientes/nuevo` ─ `/editar` | Alta y edición (DNI, nombre, apellido, email, celular) |
| **Lista de vehículos** | `/admin/vehiculos` | Tabla con filtro por disponibilidad y búsqueda |
| **Formulario vehículo** | `/admin/vehiculos/nuevo` ─ `/editar` | Alta y edición con selección en cascada tipo→marca→modelo |
| **Lista de alquileres** | `/admin/alquileres` | Tabla con filtro por estado + acciones devolver/cancelar/eliminar |
| **Formulario alquiler** | `/admin/alquileres/nuevo` | Búsqueda de cliente, selector de vehículo disponible, fechas, precio, resumen en vivo |

### 2.5 Sistema de categorías de clientes

El sistema asigna una categoría automática a cada cliente según la cantidad y valor de sus alquileres (lógica en frontend via `categoryMap`):

| Categoría | Descripción |
|---|---|
| **Platino** | Clientes de mayor volumen / frecuencia |
| **Oro** | Clientes recurrentes activos |
| **Plata** | Clientes con historial moderado |
| **Bronce** | Clientes nuevos o con baja actividad |

### 2.6 Seguridad

- Autenticación mediante **JWT** con expiración de 8 horas.
- Middleware `requireAuth(role)` protege todas las rutas del panel `/admin` con verificación de rol.
- Las rutas públicas (`/`, `/login`) no requieren token.
- Credenciales configurables via variables de entorno (`.env`).

---

## 3. Contextualización del Mercado

### 3.1 Contexto del sector

El mercado de alquiler de vehículos en Argentina presenta las siguientes características relevantes:

- **Crecimiento del turismo interno**: Córdoba es uno de los destinos más visitados del país, con alta demanda de movilidad privada para traslados ejecutivos, turismo de experiencias y eventos corporativos.
- **Segmentación del mercado**: existe una brecha clara entre las empresas masivas de rent-a-car (Hertz, Avis, Localiza) orientadas al precio bajo, y el nicho de **lujo y experiencia premium** prácticamente desatendido en el interior del país.
- **Digitalización de la industria**: los consumidores premium esperan procesos ágiles, digitales y personalizados. La gestión manual o en hojas de cálculo genera fricciones que impactan negativamente en la experiencia de servicio.
- **Contexto macroeconómico**: la inestabilidad cambiaria en Argentina impulsa a las empresas del sector a facturar en pesos con revisión periódica de tarifas, lo que requiere un sistema flexible en la configuración de precios por alquiler.

### 3.2 Competencia directa e indirecta

| Tipo | Ejemplos | Diferencia con AutoPremium |
|---|---|---|
| **Rent-a-car masivo** | Hertz, Avis, Localiza | Enfocados en volumen y precio bajo, flota estándar |
| **Remis ejecutivo** | Servicios locales de traslado | No ofrecen autogestión al cliente ni vehículos premium en alquiler libre |
| **Rent-a-car de nicho** | Pequeños operadores locales sin sistema | Operación manual, sin control de disponibilidad en tiempo real |
| **Plataformas P2P** | Getaround, Turo (no operan en Argentina) | Modelo diferente (marketplace), no aplican localmente |

### 3.3 Tendencias del sector

- Demanda creciente de **experiencias** sobre posesión: el cliente ejecutivo prefiere alquilar un Porsche por un fin de semana antes de comprar un auto de gama media.
- **Turismo de boda y eventos**: alta demanda de vehículos de lujo para traslados y sesiones fotográficas.
- **Viajes de negocios corporativos**: empresas que necesitan movilidad premium para directivos o visitantes internacionales.
- La **trazabilidad digital** del historial de alquileres es un diferencial de confianza ante el cliente.

---

## 4. Clientes Ideales (Buyer Personas)

### Persona 1 — El Ejecutivo Corporativo

| Atributo | Descripción |
|---|---|
| **Edad** | 35–55 años |
| **Perfil** | Directivo de empresa, gerente regional, consultor senior |
| **Necesidad** | Movilidad de lujo durante viajes de negocios o para recibir clientes importantes |
| **Comportamiento** | Reserva con anticipación, valora la puntualidad y la presentación del vehículo |
| **Sensibilidad al precio** | Baja — prioriza la calidad y la imagen |
| **Canal** | Contacto directo, referidos, empresa paga el alquiler |
| **Pain point** | Autos corporativos indisponibles, rent-a-car masivos con flota básica |

### Persona 2 — El Turista Premium

| Atributo | Descripción |
|---|---|
| **Edad** | 28–50 años |
| **Perfil** | Turista de alto poder adquisitivo (nacional o internacional), viajero de experiencias |
| **Necesidad** | Explorar Córdoba y la región serrana con un vehículo acorde a su estilo de vida |
| **Comportamiento** | Busca la experiencia completa, comparte en redes sociales, valora el detalle |
| **Sensibilidad al precio** | Media-baja |
| **Canal** | Instagram, recomendaciones de hoteles boutique, agencias de viajes premium |
| **Pain point** | Oferta limitada de autos premium en alquiler fuera de Buenos Aires |

### Persona 3 — El Organizador de Eventos

| Atributo | Descripción |
|---|---|
| **Edad** | 30–45 años |
| **Perfil** | Wedding planner, organizador de eventos corporativos, productor de contenido |
| **Necesidad** | Vehículos de lujo para bodas, sesiones de fotos, filmaciones, eventos VIP |
| **Comportamiento** | Planifica con semanas de anticipación, necesita confirmación inmediata y comprobante |
| **Sensibilidad al precio** | Media (el costo se traslada al cliente final del evento) |
| **Canal** | Referidos del sector eventos, redes sociales, alianzas con fotógrafos |
| **Pain point** | Dificultad para garantizar disponibilidad y obtener documentación del alquiler |

### Persona 4 — El Caprichoso Ocasional

| Atributo | Descripción |
|---|---|
| **Edad** | 22–40 años |
| **Perfil** | Profesional joven con ingresos altos o acceso a crédito, o entusiasta de autos |
| **Necesidad** | Alquilar un deportivo o SUV premium para una experiencia puntual (cumpleaños, aniversario) |
| **Comportamiento** | Decisión impulsiva o emocional, busca online, quiere el proceso fácil y rápido |
| **Sensibilidad al precio** | Alta en precio total, baja en precio diario si la duración es corta |
| **Canal** | Redes sociales, Google, boca a boca |
| **Pain point** | No hay opción de vivir la experiencia de un auto de lujo sin comprarlo |

---

## 5. Definición del Producto

### 5.1 Qué es AutoPremium (como sistema)

AutoPremium es un **sistema de gestión operativa full-stack** para empresas de alquiler de vehículos de lujo. Combina un sitio público de captación con un panel administrativo interno que cubre el 100% del flujo operativo del negocio.

### 5.2 Propuesta de valor

> "Gestionar una flota de lujo con la misma excelencia que se le ofrece al cliente."

El sistema elimina la fricción operativa de negocios que hoy funcionan con cuadernos o planillas, reemplazándola con un flujo digital, trazable y con alertas automáticas.

### 5.3 Funcionalidades del producto

#### Sitio público
- Presentación institucional de la marca con identidad visual de lujo.
- Descripción de la flota disponible (categorías: sedán, SUV, deportivo).
- Propuesta de valor y diferenciadores (seguridad, atención premium, disponibilidad 24/7).
- CTA directo a contacto / reserva.

#### Panel administrativo (acceso con autenticación)
| Funcionalidad | Detalle |
|---|---|
| **Dashboard** | Vista instantánea de: alquileres activos, ingresos del mes, alquileres nuevos del mes, alertas de vencimientos, disponibilidad de flota, total de clientes |
| **Gestión de clientes** | ABM completo + categorización automática (Platino/Oro/Plata/Bronce) + búsqueda por apellido + filtro por categoría |
| **Perfil de cliente** | Vista integrada: datos personales, vehículos asociados, historial completo de alquileres |
| **Gestión de vehículos** | ABM completo + catálogo jerárquico tipo→marca→modelo + filtro por disponibilidad + búsqueda libre |
| **Gestión de alquileres** | Crear contrato, ver estado en tiempo real, registrar devolución con fecha real, cancelar, eliminar |
| **Cálculo automático** | Al crear: previsualización de días y total estimado. Al devolver: total final calculado automáticamente |
| **Control de disponibilidad** | El sistema impide crear un alquiler sobre un vehículo con alquiler activo |
| **Alertas de vencimientos** | Banner visible en Dashboard cuando hay alquileres activos con fecha de fin prevista vencida o por vencer hoy |

### 5.4 Diferenciadores del producto

1. **Doble modo de operación**: puede correr con base de datos MySQL (producción) o en modo JSON sin base de datos (demo / desarrollo), sin cambiar una línea de código.
2. **Prevención de conflictos**: la regla de negocio de "un vehículo no puede tener dos alquileres activos simultáneos" está implementada tanto en frontend como en backend.
3. **Cálculo inteligente de totales**: el precio total se calcula sobre los días reales de uso al momento de la devolución, no sobre los días pactados.
4. **Identidad visual de lujo**: el sistema proyecta la misma imagen premium que el servicio que gestiona, lo que refuerza la percepción de marca ante cualquier usuario que lo vea.
5. **Arquitectura modular**: separación clara entre rutas, controladores, servicios de repositorio y modelos, lo que facilita el mantenimiento y la extensión futura.

### 5.5 Limitaciones actuales (v1 — prototipo)

| Limitación | Impacto | Posible evolución |
|---|---|---|
| Un único rol de usuario (admin) | No hay multi-usuario ni permisos granulares | Implementar roles: admin, operador, solo lectura |
| Sin módulo de pagos | El pago se registra fuera del sistema | Integración con Mercado Pago o facturación |
| Sin notificaciones automáticas | Los vencimientos solo se ven en el dashboard si el admin ingresa | Envío de emails/WhatsApp automatizados |
| Sin app móvil | Solo accesible desde navegador desktop | PWA o app nativa |
| Sin historial de precios | No hay registro de cambios tarifarios | Auditoría / log de precios |
| Sin módulo de reportes exportables | No se puede exportar a Excel/PDF | Integración de reportes con filtros |

### 5.6 Roadmap sugerido

| Fase | Funcionalidades |
|---|---|
| **v1 — actual** | CRUD completo, dashboard, autenticación JWT, control de disponibilidad |
| **v2** | Multi-usuario con roles, módulo de contratos/documentos PDF, notificaciones por vencimiento |
| **v3** | Reservas online por el cliente final, integración de pagos, app móvil PWA |
| **v4** | Reportes avanzados, integración contable, multi-sucursal |

---

## 6. Resumen ejecutivo

**AutoPremium** resuelve un problema real y desatendido en el mercado cordobés: la **ausencia de herramientas digitales especializadas para el nicho de alquiler de vehículos de lujo**. Los competidores directos del segmento operan de forma manual o con soluciones genéricas que no reflejan la identidad premium de su marca ni ofrecen control operativo en tiempo real.

El sistema combina una **interfaz pública de captación** con un **panel de gestión interno completo**, cubriendo el ciclo de vida completo de cada alquiler desde el alta del cliente hasta el cálculo del total al momento de la devolución. Su arquitectura modular y su doble modo de ejecución (JSON / MySQL) lo hacen apropiado tanto como herramienta de producción como demostración funcional del negocio.

El cliente destinatario del servicio (ejecutivos, turistas premium, organizadores de eventos) valora la experiencia y la confianza por sobre el precio, lo que hace que un sistema de gestión que proyecte **profesionalismo y trazabilidad** sea un diferencial competitivo directo para la empresa que lo adopte.
