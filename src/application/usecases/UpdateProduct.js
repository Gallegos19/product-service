const Joi = require('joi');

class UpdateProduct {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async execute(id, updateData) {
    const schema = Joi.object({
      name: Joi.string().min(3).max(200).optional(),
      description: Joi.string().min(10).max(2000).optional(),
      price: Joi.number().min(0).optional(),
      category: Joi.string().optional(),
      stock: Joi.number().integer().min(0).optional(),
      imageUrl: Joi.string().uri().optional(),
      sku: Joi.string().optional(),
      updatedBy: Joi.string().required()
    });

    const { error, value } = schema.validate(updateData);
    if (error) {
      throw new Error(`Datos inválidos: ${error.details[0].message}`);
    }

    try {
      // Verificar que el producto existe
      const existingProduct = await this.productRepository.findById(id);
      if (!existingProduct) {
        return null;
      }

      // Verificar SKU único (si se está actualizando)
      if (value.sku && value.sku !== existingProduct.sku) {
        const productWithSku = await this.productRepository.findBySku(value.sku);
        if (productWithSku) {
          throw new Error('Ya existe un producto con este SKU');
        }
      }

      const updatedProduct = await this.productRepository.update(id, value);
      return updatedProduct;
    } catch (error) {
      throw new Error(`Error al actualizar producto: ${error.message}`);
    }
  }
}

module.exports = UpdateProduct;