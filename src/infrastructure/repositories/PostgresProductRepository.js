class PostgresProductRepository {
  constructor(dbConnection) {
    this.db = dbConnection;
  }

  async findAll(options = {}) {
    const { limit = 10, offset = 0, category, search } = options;
    let query = 'SELECT * FROM products WHERE 1=1';
    const params = [];
    let paramCount = 0;

    if (category) {
      paramCount++;
      query += ` AND category = $${paramCount}`;
      params.push(category);
    }

    if (search) {
      paramCount++;
      query += ` AND (name ILIKE $${paramCount} OR description ILIKE $${paramCount})`;
      params.push(`%${search}%`);
    }

    query += ` ORDER BY created_at DESC LIMIT $${paramCount + 1} OFFSET $${paramCount + 2}`;
    params.push(limit, offset);

    const result = await this.db.query(query, params);
    return result.rows;
  }

  async count(options = {}) {
    const { category, search } = options;
    let query = 'SELECT COUNT(*) FROM products WHERE 1=1';
    const params = [];
    let paramCount = 0;

    if (category) {
      paramCount++;
      query += ` AND category = $${paramCount}`;
      params.push(category);
    }

    if (search) {
      paramCount++;
      query += ` AND (name ILIKE $${paramCount} OR description ILIKE $${paramCount})`;
      params.push(`%${search}%`);
    }

    const result = await this.db.query(query, params);
    return parseInt(result.rows[0].count);
  }

  async findById(id) {
    const query = 'SELECT * FROM products WHERE id = $1';
    const result = await this.db.query(query, [id]);
    return result.rows[0] || null;
  }

  async findBySku(sku) {
    const query = 'SELECT * FROM products WHERE sku = $1';
    const result = await this.db.query(query, [sku]);
    return result.rows[0] || null;
  }

  async create(productData) {
    const { name, description, price, category, stock, imageUrl, sku, createdBy } = productData;
    
    const query = `
      INSERT INTO products (id, name, description, price, category, stock, image_url, sku, created_by, created_at, updated_at)
      VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, $8, NOW(), NOW())
      RETURNING *
    `;
    
    const params = [name, description, price, category, stock, imageUrl, sku, createdBy];
    const result = await this.db.query(query, params);
    return result.rows[0];
  }

  async update(id, updateData) {
    const fields = [];
    const params = [];
    let paramCount = 0;

    Object.keys(updateData).forEach(key => {
      if (updateData[key] !== undefined && key !== 'updatedBy') {
        paramCount++;
        fields.push(`${this.camelToSnake(key)} = $${paramCount}`);
        params.push(updateData[key]);
      }
    });

    if (fields.length === 0) return null;

    paramCount++;
    fields.push(`updated_at = NOW()`);
    params.push(id);

    const query = `
      UPDATE products 
      SET ${fields.join(', ')}
      WHERE id = $${paramCount}
      RETURNING *
    `;

    const result = await this.db.query(query, params);
    return result.rows[0] || null;
  }

  async delete(id) {
    const query = 'DELETE FROM products WHERE id = $1';
    await this.db.query(query, [id]);
  }

  camelToSnake(str) {
    return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
  }
}

module.exports = PostgresProductRepository;
