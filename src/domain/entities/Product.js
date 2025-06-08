class Product {
  constructor(id, name, description, price, category, stock, imageUrl, sku, createdBy, createdAt, updatedAt) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.category = category;
    this.stock = stock;
    this.imageUrl = imageUrl;
    this.sku = sku;
    this.createdBy = createdBy;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  // Business rules
  isAvailable() {
    return this.stock > 0;
  }

  isOutOfStock() {
    return this.stock === 0;
  }

  isLowStock(threshold = 5) {
    return this.stock <= threshold && this.stock > 0;
  }

  canReduceStock(quantity) {
    return this.stock >= quantity;
  }

  reduceStock(quantity) {
    if (!this.canReduceStock(quantity)) {
      throw new Error('Stock insuficiente');
    }
    this.stock -= quantity;
  }

  increaseStock(quantity) {
    if (quantity <= 0) {
      throw new Error('La cantidad debe ser mayor a 0');
    }
    this.stock += quantity;
  }

  updatePrice(newPrice) {
    if (newPrice < 0) {
      throw new Error('El precio no puede ser negativo');
    }
    this.price = newPrice;
  }

  // Factory method para crear desde datos de BD
  static fromDatabase(dbRow) {
    return new Product(
      dbRow.id,
      dbRow.name,
      dbRow.description,
      parseFloat(dbRow.price),
      dbRow.category,
      parseInt(dbRow.stock),
      dbRow.image_url,
      dbRow.sku,
      dbRow.created_by,
      dbRow.created_at,
      dbRow.updated_at
    );
  }

  // Método para convertir a objeto plano
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      price: this.price,
      category: this.category,
      stock: this.stock,
      imageUrl: this.imageUrl,
      sku: this.sku,
      isAvailable: this.isAvailable(),
      isOutOfStock: this.isOutOfStock(),
      isLowStock: this.isLowStock(),
      createdBy: this.createdBy,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}

module.exports = Product;