import pool from './db.js';

(async () => {
  try {
    const res = await pool.query('SELECT id, tanggal, created_at, shift FROM input_kegiatan ORDER BY id;');
    console.log(JSON.stringify(res.rows, null, 2));
  } catch (err) {
    console.error(err);
  }
  process.exit();
})();