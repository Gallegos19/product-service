const Joi = require('joi');

class CreateProduct {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async execute(productData) {
    // Validación de datos
    const schema = Joi.object({
      name: Joi.string().min(3).max(200).required(),
      description: Joi.string().min(10).max(2000).required(),
      price: Joi.number().min(0).required(),
      category: Joi.string().required(),
      stock: Joi.number().integer().min(0).required(),
      imageUrl: Joi.string().uri().optional(),
      sku: Joi.string().optional(),
      createdBy: Joi.string().required()
    });

    const { error, value } = schema.validate(productData);
    if (error) {
      throw new Error(`Datos inválidos: ${error.details[0].message}`);
    }

    try {
      // Verificar que el SKU no exista (si se proporciona)
      if (value.sku) {
        const existingProduct = await this.productRepository.findBySku(value.sku);
        if (existingProduct) {
          throw new Error('Ya existe un producto con este SKU');
        }
      }

      const product = await this.productRepository.create(value);
      return product;
    } catch (error) {
      throw new Error(`Error al crear producto: ${error.message}`);
    }
  }
}

module.exports = CreateProduct;
