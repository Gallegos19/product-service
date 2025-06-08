const express = require('express');
const extractUserInfo = require('../middleware/extracUserInfo');
const ProductController = require('../controllers/ProductController');

// Use Cases
const GetAllProducts = require('../../application/usecases/GetAllProducts');
const GetProductById = require('../../application/usecases/GetProductById');
const CreateProduct = require('../../application/usecases/CreateProduct');
const UpdateProduct = require('../../application/usecases/UpdateProduct');
const DeleteProduct = require('../../application/usecases/DeleteProduct');

// Repositories
const PostgresProductRepository = require('../repositories/PostgresProductRepository');
const DatabaseConnection = require('../database/connection');

const router = express.Router();

// Dependency Injection
const dbConnection = new DatabaseConnection();
const productRepository = new PostgresProductRepository(dbConnection);

const getAllProducts = new GetAllProducts(productRepository);
const getProductById = new GetProductById(productRepository);
const createProduct = new CreateProduct(productRepository);
const updateProduct = new UpdateProduct(productRepository);
const deleteProduct = new DeleteProduct(productRepository);

const productController = new ProductController(
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
);

// Middleware para todas las rutas
router.use(extractUserInfo);

// Rutas públicas
router.get('/products', (req, res, next) => productController.getAll(req, res, next));
router.get('/products/:id', (req, res, next) => productController.getById(req, res, next));

// Rutas protegidas (requieren admin desde API Gateway)
router.post('/products', (req, res, next) => productController.create(req, res, next));
router.put('/products/:id', (req, res, next) => productController.update(req, res, next));
router.delete('/products/:id', (req, res, next) => productController.delete(req, res, next));

module.exports = router;
