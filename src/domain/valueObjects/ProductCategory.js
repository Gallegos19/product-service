class ProductCategory {
  static VALID_CATEGORIES = [
    'electronics',
    'clothing',
    'books',
    'home',
    'sports',
    'beauty',
    'toys',
    'automotive',
    'health',
    'food'
  ];

  constructor(category) {
    if (!category || typeof category !== 'string') {
      throw new Error('La categoría es requerida y debe ser una cadena');
    }

    const normalizedCategory = category.toLowerCase().trim();
    
    if (!ProductCategory.VALID_CATEGORIES.includes(normalizedCategory)) {
      throw new Error(`Categoría inválida. Debe ser una de: ${ProductCategory.VALID_CATEGORIES.join(', ')}`);
    }

    this.value = normalizedCategory;
  }

  toString() {
    return this.value;
  }

  equals(other) {
    return other instanceof ProductCategory && this.value === other.value;
  }

  static getAllCategories() {
    return [...ProductCategory.VALID_CATEGORIES];
  }

  static isValid(category) {
    try {
      new ProductCategory(category);
      return true;
    } catch {
      return false;
    }
  }
}

module.exports = ProductCategory;