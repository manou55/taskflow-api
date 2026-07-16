const pool = require('../config/database');

class Task {
  static async create(taskData) {
    const { title, description, userId, teamId, priority, dueDate } = taskData;
    
    const query = `
      INSERT INTO tasks (title, description, user_id, team_id, priority, due_date, status, created_at)
      VALUES ($1, $2, $3, $4, $5, $6, 'todo', NOW())
      RETURNING *
    `;

    const result = await pool.query(query, [title, description, userId, teamId, priority, dueDate]);
    return result.rows[0];
  }

  static async getByTeam(teamId) {
    const query = `
      SELECT * FROM tasks 
      WHERE team_id = $1 
      ORDER BY created_at DESC
    `;
    const result = await pool.query(query, [teamId]);
    return result.rows;
  }

  static async getById(taskId) {
    const query = 'SELECT * FROM tasks WHERE id = $1';
    const result = await pool.query(query, [taskId]);
    return result.rows[0];
  }

  static async update(taskId, updateData) {
    const { title, description, status, priority, dueDate } = updateData;
    
    const query = `
      UPDATE tasks 
      SET title = COALESCE($1, title),
          description = COALESCE($2, description),
          status = COALESCE($3, status),
          priority = COALESCE($4, priority),
          due_date = COALESCE($5, due_date),
          updated_at = NOW()
      WHERE id = $6
      RETURNING *
    `;

    const result = await pool.query(query, [title, description, status, priority, dueDate, taskId]);
    return result.rows[0];
  }

  static async delete(taskId) {
    const query = 'DELETE FROM tasks WHERE id = $1 RETURNING id';
    const result = await pool.query(query, [taskId]);
    return result.rows[0];
  }

  static async assignUser(taskId, userId) {
    const query = `
      UPDATE tasks 
      SET assigned_to = $1, updated_at = NOW()
      WHERE id = $2
      RETURNING *
    `;
    const result = await pool.query(query, [userId, taskId]);
    return result.rows[0];
  }
}

module.exports = Task;