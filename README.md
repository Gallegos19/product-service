# Product Service

Microservicio para la gestión de productos del sistema de e-commerce.

## 🏗️ Arquitectura

Sigue **Clean Architecture** con las siguientes capas:

```
src/
├── domain/                     # Capa de Dominio
│   ├── entities/               # Entidades de negocio
│   │   └── Product.js
│   ├── repositories/           # Contratos de repositorios
│   │   └── ProductRepository.js
│   └── value-objects/          # Objetos de valor
│       ├── Money.js
│       └── ProductCategory.js
├── application/                # Capa de Aplicación
│   └── usecases/              # Casos de uso
│       ├── GetAllProducts.js
│       ├── GetProductById.js
│       ├── CreateProduct.js
│       ├── UpdateProduct.js
│       └── DeleteProduct.js
└── infrastructure/            # Capa de Infraestructura
    ├── web/                   # Controladores y rutas
    │   ├── controllers/
    │   ├── routes/
    │   └── middleware/
    ├── repositories/          # Implementaciones de repositorios
    │   └── PostgresProductRepository.js
    └── database/              # Configuración de BD
        └── connection.js
```

## 🚀 Endpoints Disponibles

### Públicos
- `GET /products` - Listar productos con filtros
- `GET /products/:id` - Obtener producto por ID

### Protegidos (Admin)
- `POST /products` - Crear producto
- `PUT /products/:id` - Actualizar producto
- `DELETE /products/:id` - Eliminar producto

## 🛠️ Configuración

1. **Instalar dependencias:**
```bash
npm install
```

2. **Configurar base de datos:**
```bash
npm run init-db
```

3. **Ejecutar en desarrollo:**
```bash
npm run dev
```

## 🎯 Características

- ✅ **Clean Architecture**
- ✅ **Domain-Driven Design**
- ✅ **Entidades con lógica de negocio**
- ✅ **Value Objects** (Money, ProductCategory)
- ✅ **Repository Pattern**
- ✅ **Dependency Injection**
- ✅ **Validaciones con Joi**
- ✅ **Paginación y filtros**
- ✅ **Headers del API Gateway**

## 🔌 Integración con API Gateway

El servicio recibe headers del API Gateway:
- `x-user-id` - ID del usuario autenticado
- `x-user-email` - Email del usuario
- `x-user-role` - Rol del usuario (user/admin)
- `x-request-id` - ID único de la petición

## 📊 Base de Datos

### Tabla: products
```sql
- id (UUID, PK)
- name (VARCHAR)
- description (TEXT)
- price (DECIMAL)
- category (VARCHAR)
- stock (INTEGER)
- image_url (VARCHAR)
- sku (VARCHAR, UNIQUE)
- created_by (UUID)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

## 🧪 Testing

```bash
# Ejecutar tests
npm test

# Tests con cobertura
npm run test:coverage
```

## 📝 Ejemplos de Uso

### Crear producto
```bash
POST /products
{
  "name": "Smartphone XYZ",
  "description": "Smartphone de última generación",
  "price": 15000.00,
  "category": "electronics",
  "stock": 25,
  "sku": "PHONE001"
}
```

### Listar productos con filtros
```bash
GET /products?category=electronics&search=laptop&page=1&limit=10
```

### Actualizar stock
```bash
PUT /products/:id
{
  "stock": 15
}