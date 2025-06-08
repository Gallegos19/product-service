class GetProductById {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async execute(id) {
    try {
      if (!id) {
        throw new Error('ID de producto es requerido');
      }

      const product = await this.productRepository.findById(id);
      return product;
    } catch (error) {
      throw new Error(`Error al obtener producto: ${error.message}`);
    }
  }
}

module.exports = GetProductById;