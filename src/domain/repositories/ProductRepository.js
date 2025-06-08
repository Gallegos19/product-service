class ProductRepository {
  /**
   * Obtener todos los productos con filtros y paginación
   * @param {Object} options - Opciones de filtro
   * @param {number} options.limit - Límite de resultados
   * @param {number} options.offset - Offset para paginación
   * @param {string} options.category - Filtro por categoría
   * @param {string} options.search - Búsqueda por nombre/descripción
   * @returns {Promise<Product[]>}
   */
  async findAll(options = {}) {
    throw new Error('Method findAll must be implemented');
  }

  /**
   * Contar productos con filtros
   * @param {Object} options - Opciones de filtro
   * @returns {Promise<number>}
   */
  async count(options = {}) {
    throw new Error('Method count must be implemented');
  }

  /**
   * Buscar producto por ID
   * @param {string} id - ID del producto
   * @returns {Promise<Product|null>}
   */
  async findById(id) {
    throw new Error('Method findById must be implemented');
  }

  /**
   * Buscar producto por SKU
   * @param {string} sku - SKU del producto
   * @returns {Promise<Product|null>}
   */
  async findBySku(sku) {
    throw new Error('Method findBySku must be implemented');
  }

  /**
   * Crear nuevo producto
   * @param {Object} productData - Datos del producto
   * @returns {Promise<Product>}
   */
  async create(productData) {
    throw new Error('Method create must be implemented');
  }

  /**
   * Actualizar producto existente
   * @param {string} id - ID del producto
   * @param {Object} updateData - Datos a actualizar
   * @returns {Promise<Product|null>}
   */
  async update(id, updateData) {
    throw new Error('Method update must be implemented');
  }

  /**
   * Eliminar producto
   * @param {string} id - ID del producto
   * @returns {Promise<void>}
   */
  async delete(id) {
    throw new Error('Method delete must be implemented');
  }

  /**
   * Buscar productos por categoría
   * @param {string} category - Categoría
   * @returns {Promise<Product[]>}
   */
  async findByCategory(category) {
    throw new Error('Method findByCategory must be implemented');
  }

  /**
   * Buscar productos con stock bajo
   * @param {number} threshold - Umbral de stock bajo
   * @returns {Promise<Product[]>}
   */
  async findLowStock(threshold = 5) {
    throw new Error('Method findLowStock must be implemented');
  }
}

module.exports = ProductRepository;