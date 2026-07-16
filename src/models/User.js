const pool = require('../config/database');
const bcrypt = require('bcryptjs');

class User {
  static async create(userData) {
    const { email, password, name } = userData;
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const query = `
      INSERT INTO users (email, password, name, created_at)
      VALUES ($1, $2, $3, NOW())
      RETURNING id, email, name, created_at
    `;

    const result = await pool.query(query, [email, hashedPassword, name]);
    return result.rows[0];
  }

  static async findByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = $1';
    const result = await pool.query(query, [email]);
    return result.rows[0];
  }

  static async findById(id) {
    const query = 'SELECT id, email, name, role, created_at FROM users WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async verifyPassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  }

  static async update(userId, updateData) {
    const { name, role } = updateData;
    const query = `
      UPDATE users 
      SET name = COALESCE($1, name), role = COALESCE($2, role), updated_at = NOW()
      WHERE id = $3
      RETURNING id, email, name, role
    `;
    const result = await pool.query(query, [name, role, userId]);
    return result.rows[0];
  }
}

module.exports = User;