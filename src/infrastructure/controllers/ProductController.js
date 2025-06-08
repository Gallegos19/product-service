class ProductController {
  constructor(getAllProducts, getProductById, createProduct, updateProduct, deleteProduct) {
    this.getAllProducts = getAllProducts;
    this.getProductById = getProductById;
    this.createProduct = createProduct;
    this.updateProduct = updateProduct;
    this.deleteProduct = deleteProduct;
  }

  async getAll(req, res, next) {
    try {
      const { page = 1, limit = 10, category, search } = req.query;
      
      const filters = {
        page: parseInt(page),
        limit: parseInt(limit),
        category,
        search
      };

      const result = await this.getAllProducts.execute(filters);
      
      res.json({
        success: true,
        data: result.products,
        pagination: {
          currentPage: result.currentPage,
          totalPages: result.totalPages,
          totalItems: result.totalItems,
          itemsPerPage: result.itemsPerPage
        }
      });
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const product = await this.getProductById.execute(id);
      
      if (!product) {
        return res.status(404).json({
          success: false,
          error: 'Producto no encontrado'
        });
      }

      res.json({
        success: true,
        data: product
      });
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      // Verificar que el usuario sea admin (validado por API Gateway)
      if (req.user.role !== 'admin') {
        return res.status(403).json({
          success: false,
          error: 'Se requieren permisos de administrador'
        });
      }

      const productData = {
        ...req.body,
        createdBy: req.user.id
      };

      const product = await this.createProduct.execute(productData);
      
      res.status(201).json({
        success: true,
        message: 'Producto creado exitosamente',
        data: product
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      if (req.user.role !== 'admin') {
        return res.status(403).json({
          success: false,
          error: 'Se requieren permisos de administrador'
        });
      }

      const { id } = req.params;
      const updateData = {
        ...req.body,
        updatedBy: req.user.id
      };

      const product = await this.updateProduct.execute(id, updateData);
      
      if (!product) {
        return res.status(404).json({
          success: false,
          error: 'Producto no encontrado'
        });
      }

      res.json({
        success: true,
        message: 'Producto actualizado exitosamente',
        data: product
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      if (req.user.role !== 'admin') {
        return res.status(403).json({
          success: false,
          error: 'Se requieren permisos de administrador'
        });
      }

      const { id } = req.params;
      const deleted = await this.deleteProduct.execute(id);
      
      if (!deleted) {
        return res.status(404).json({
          success: false,
          error: 'Producto no encontrado'
        });
      }

      res.json({
        success: true,
        message: 'Producto eliminado exitosamente'
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ProductController;