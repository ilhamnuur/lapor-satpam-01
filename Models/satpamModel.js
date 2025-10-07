import dbPromise from "../db.js";

const Satpam = {
  /**
   * Find satpam by username
   * @param {string} username 
   * @returns {Promise<Object|null>}
   */
  async findByUsername(username) {
    const pool = dbPromise;
    const { rows } = await pool.query(
      `SELECT * FROM satpam WHERE username = $1 LIMIT 1`,
      [username]
    );
    return rows[0] || null;
  },

  /**
   * Find satpam by ID
   * @param {number} id_satpam 
   * @returns {Promise<Object|null>}
   */
  async findById(id_satpam) {
    const pool = dbPromise;
    const { rows } = await pool.query(
      `SELECT * FROM satpam WHERE id_satpam = $1 LIMIT 1`,
      [id_satpam]
    );
    return rows[0] || null;
  },

  /**
   * Create a new satpam user
   * @param {Object} satpamData 
   * @returns {Promise<Object>}
   */
  async create({ username, password, nama_satpam, role = 'user' }) {
    const pool = dbPromise;
    const { rows } = await pool.query(
      `INSERT INTO satpam (username, password, nama_satpam, role)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [username, password, nama_satpam, role]
    );
    return rows[0];
  },

  /**
   * Get all satpam users
   * @returns {Promise<Array>}
   */
  async findAll() {
    const pool = dbPromise;
    const { rows } = await pool.query(
      `SELECT id_satpam, username, nama_satpam, role, created_at 
       FROM satpam ORDER BY nama_satpam ASC`
    );
    return rows;
  }
};

export default Satpam;