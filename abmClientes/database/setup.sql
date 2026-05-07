-- =============================================================
--  SCRIPT DE CREACIÓN DE BASE DE DATOS — Alquiler de Vehículos
--  Ejecutar en MySQL como: mysql -u root -p < database/setup.sql
-- =============================================================

CREATE DATABASE IF NOT EXISTS lavaderowebapi
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE lavaderowebapi;

-- -------------------------------------------------------------
-- 1. tipoVehiculos
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS tipoVehiculos (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  tipoVehiculo  VARCHAR(255) NOT NULL,
  createdAt     DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt     DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- -------------------------------------------------------------
-- 2. marcaVehiculos
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS marcaVehiculos (
  id              INT AUTO_INCREMENT PRIMARY KEY,
  marcaVehiculo   VARCHAR(255) NOT NULL,
  tipoVehiculoId  INT,
  createdAt       DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt       DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_marca_tipo
    FOREIGN KEY (tipoVehiculoId) REFERENCES tipoVehiculos(id)
    ON UPDATE CASCADE ON DELETE SET NULL
);

-- -------------------------------------------------------------
-- 3. modeloVehiculos
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS modeloVehiculos (
  id              INT AUTO_INCREMENT PRIMARY KEY,
  modeloVehiculo  VARCHAR(255) NOT NULL,
  marcaVehiculoId INT,
  createdAt       DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt       DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_modelo_marca
    FOREIGN KEY (marcaVehiculoId) REFERENCES marcaVehiculos(id)
    ON UPDATE CASCADE ON DELETE SET NULL
);

-- -------------------------------------------------------------
-- 4. clientes
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS clientes (
  id        INT AUTO_INCREMENT PRIMARY KEY,
  dni       BIGINT,
  nombre    VARCHAR(255),
  apellido  VARCHAR(255),
  celular   BIGINT,
  email     VARCHAR(255),
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- -------------------------------------------------------------
-- 5. vehiculos
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS vehiculos (
  id               INT AUTO_INCREMENT PRIMARY KEY,
  año              INT,
  patente          VARCHAR(255),
  clienteId        INT,
  modeloVehiculoId INT,
  createdAt        DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt        DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_vehiculo_cliente
    FOREIGN KEY (clienteId) REFERENCES clientes(id)
    ON UPDATE CASCADE ON DELETE SET NULL,
  CONSTRAINT fk_vehiculo_modelo
    FOREIGN KEY (modeloVehiculoId) REFERENCES modeloVehiculos(id)
    ON UPDATE CASCADE ON DELETE SET NULL
);

-- -------------------------------------------------------------
-- 6. alquileres
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS alquileres (
  id               INT AUTO_INCREMENT PRIMARY KEY,
  clienteId        INT NOT NULL,
  vehiculoId       INT NOT NULL,
  fechaInicio      DATE NOT NULL,
  fechaFinPrevista DATE NOT NULL,
  fechaDevolucion  DATE,
  precioPorDia     DECIMAL(10,2) NOT NULL,
  totalCalculado   DECIMAL(10,2),
  estado           ENUM('activo','finalizado','cancelado') NOT NULL DEFAULT 'activo',
  observaciones    TEXT,
  createdAt        DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt        DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_alquiler_cliente
    FOREIGN KEY (clienteId) REFERENCES clientes(id)
    ON UPDATE CASCADE ON DELETE RESTRICT,
  CONSTRAINT fk_alquiler_vehiculo
    FOREIGN KEY (vehiculoId) REFERENCES vehiculos(id)
    ON UPDATE CASCADE ON DELETE RESTRICT
);

-- =============================================================
--  DATOS INICIALES (catálogo de tipos, marcas y modelos)
-- =============================================================

INSERT IGNORE INTO tipoVehiculos (id, tipoVehiculo) VALUES
  (1, 'Automóvil'),
  (2, 'Motocicleta'),
  (3, 'Utilitario');

INSERT IGNORE INTO marcaVehiculos (id, marcaVehiculo, tipoVehiculoId) VALUES
  (1,  'Toyota',    1),
  (2,  'Ford',      1),
  (3,  'Chevrolet', 1),
  (4,  'Volkswagen',1),
  (5,  'Honda',     2),
  (6,  'Yamaha',    2),
  (7,  'Renault',   3),
  (8,  'Fiat',      3);

INSERT IGNORE INTO modeloVehiculos (id, modeloVehiculo, marcaVehiculoId) VALUES
  -- Toyota
  (1,  'Corolla',  1),
  (2,  'Hilux',    1),
  (3,  'Etios',    1),
  -- Ford
  (4,  'Focus',    2),
  (5,  'Ranger',   2),
  (6,  'Ka',       2),
  -- Chevrolet
  (7,  'Onix',     3),
  (8,  'S10',      3),
  (9,  'Cruze',    3),
  -- Volkswagen
  (10, 'Gol',      4),
  (11, 'Polo',     4),
  (12, 'Amarok',   4),
  -- Honda (motos)
  (13, 'CB190R',   5),
  (14, 'CB300',    5),
  (15, 'XRE300',   5),
  -- Yamaha (motos)
  (16, 'FZ25',     6),
  (17, 'YBR125',   6),
  (18, 'MT07',     6),
  -- Renault (utilitarios)
  (19, 'Master',   7),
  (20, 'Kangoo',   7),
  -- Fiat (utilitarios)
  (21, 'Ducato',   8),
  (22, 'Fiorino',  8);

-- =============================================================
--  DATOS DE EJEMPLO (clientes, vehículos y alquileres)
--  Eliminá este bloque si no querés datos de prueba
-- =============================================================

INSERT IGNORE INTO clientes (id, dni, nombre, apellido, celular, email) VALUES
  (1, 30456789, 'Juan',   'Pérez',     3515001122, 'juan.perez@mail.com'),
  (2, 25987654, 'María',  'González',  3515223344, 'maria.gonzalez@mail.com'),
  (3, 33112233, 'Carlos', 'Rodríguez', 3516334455, 'carlos.rodriguez@mail.com'),
  (4, 28765432, 'Laura',  'Martínez',  3517445566, 'laura.martinez@mail.com'),
  (5, 35221144, 'Diego',  'López',     3518556677, 'diego.lopez@mail.com');

INSERT IGNORE INTO vehiculos (id, año, patente, clienteId, modeloVehiculoId) VALUES
  (1, 2022, 'AB123CD', 1, 1),   -- Corolla de Juan
  (2, 2020, 'EF456GH', 2, 7),   -- Onix de María
  (3, 2021, 'IJ789KL', 3, 13),  -- CB190R de Carlos
  (4, 2023, 'MN012OP', 4, 20),  -- Kangoo de Laura
  (5, 2019, 'QR345ST', 5, 5),   -- Ranger de Diego
  (6, 2024, 'UV678WX', NULL, 11); -- Polo sin cliente asignado

INSERT IGNORE INTO alquileres
  (id, clienteId, vehiculoId, fechaInicio, fechaFinPrevista, fechaDevolucion, precioPorDia, totalCalculado, estado, observaciones) VALUES
  (1, 1, 1, '2026-04-28', '2026-05-05', NULL,         15000.00, NULL,     'activo',    'Viaje de negocios'),
  (2, 2, 2, '2026-04-01', '2026-04-07', '2026-04-07', 12000.00, 84000.00, 'finalizado', NULL),
  (3, 3, 3, '2026-03-15', '2026-03-20', NULL,          8000.00, NULL,     'cancelado', 'Cancelado por el cliente');
