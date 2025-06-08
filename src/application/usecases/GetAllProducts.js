class GetAllProducts {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async execute(filters = {}) {
    const { page = 1, limit = 10, category, search } = filters;
    const offset = (page - 1) * limit;

    try {
      const products = await this.productRepository.findAll({
        limit,
        offset,
        category,
        search
      });

      const totalItems = await this.productRepository.count({ category, search });
      const totalPages = Math.ceil(totalItems / limit);

      return {
        products,
        currentPage: page,
        totalPages,
        totalItems,
        itemsPerPage: limit
      };
    } catch (error) {
      throw new Error(`Error al obtener productos: ${error.message}`);
    }
  }
}

module.exports = GetAllProducts;