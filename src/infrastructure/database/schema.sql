-- Verificar y crear base de datos solo si no existe
SELECT 'CREATE DATABASE product_db'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'product_db')\gexec

-- Conectar a la base de datos
\c product_db;

-- Crear tabla products solo si no existe
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
    category VARCHAR(100) NOT NULL,
    stock INTEGER NOT NULL DEFAULT 0 CHECK (stock >= 0),
    image_url VARCHAR(500),
    sku VARCHAR(100) UNIQUE,
    created_by UUID NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear índices solo si no existen
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_name ON products(name);
CREATE INDEX IF NOT EXISTS idx_products_sku ON products(sku);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON products(created_at);

-- Insertar datos de ejemplo solo si la tabla está vacía
INSERT INTO products (name, description, price, category, stock, sku, created_by) 
SELECT 'Laptop Gaming', 'Laptop para gaming de alta gama', 25000.00, 'electronics', 10, 'LAP001', gen_random_uuid()
WHERE NOT EXISTS (SELECT 1 FROM products WHERE sku = 'LAP001');

INSERT INTO products (name, description, price, category, stock, sku, created_by) 
SELECT 'Mouse Inalámbrico', 'Mouse inalámbrico ergonómico', 450.00, 'electronics', 50, 'MOU001', gen_random_uuid()
WHERE NOT EXISTS (SELECT 1 FROM products WHERE sku = 'MOU001');

INSERT INTO products (name, description, price, category, stock, sku, created_by) 
SELECT 'Teclado Mecánico', 'Teclado mecánico RGB', 1200.00, 'electronics', 25, 'TEC001', gen_random_uuid()
WHERE NOT EXISTS (SELECT 1 FROM products WHERE sku = 'TEC001');

INSERT INTO products (name, description, price, category, stock, sku, created_by) 
SELECT 'Monitor 4K', 'Monitor 4K 27 pulgadas', 8500.00, 'electronics', 15, 'MON001', gen_random_uuid()
WHERE NOT EXISTS (SELECT 1 FROM products WHERE sku = 'MON001');

INSERT INTO products (name, description, price, category, stock, sku, created_by) 
SELECT 'Audífonos Bluetooth', 'Audífonos con cancelación de ruido', 2800.00, 'electronics', 30, 'AUD001', gen_random_uuid()
WHERE NOT EXISTS (SELECT 1 FROM products WHERE sku = 'AUD001');