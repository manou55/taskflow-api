const pool = require('../config/database');

class Team {
  static async create(teamData) {
    const { name, description, createdBy } = teamData;
    
    const query = `
      INSERT INTO teams (name, description, created_by, created_at)
      VALUES ($1, $2, $3, NOW())
      RETURNING *
    `;

    const result = await pool.query(query, [name, description, createdBy]);
    return result.rows[0];
  }

  static async getById(teamId) {
    const query = 'SELECT * FROM teams WHERE id = $1';
    const result = await pool.query(query, [teamId]);
    return result.rows[0];
  }

  static async getUserTeams(userId) {
    const query = `
      SELECT t.* FROM teams t
      JOIN team_members tm ON t.id = tm.team_id
      WHERE tm.user_id = $1
      ORDER BY t.created_at DESC
    `;
    const result = await pool.query(query, [userId]);
    return result.rows;
  }

  static async addMember(teamId, userId, role = 'member') {
    const query = `
      INSERT INTO team_members (team_id, user_id, role, joined_at)
      VALUES ($1, $2, $3, NOW())
      RETURNING *
    `;
    const result = await pool.query(query, [teamId, userId, role]);
    return result.rows[0];
  }

  static async getMembers(teamId) {
    const query = `
      SELECT u.id, u.name, u.email, tm.role FROM users u
      JOIN team_members tm ON u.id = tm.user_id
      WHERE tm.team_id = $1
    `;
    const result = await pool.query(query, [teamId]);
    return result.rows;
  }

  static async removeMember(teamId, userId) {
    const query = `
      DELETE FROM team_members
      WHERE team_id = $1 AND user_id = $2
      RETURNING id
    `;
    const result = await pool.query(query, [teamId, userId]);
    return result.rows[0];
  }
}

module.exports = Team;