import pool from './db.js';

(async () => {
  try {
    const res = await pool.query('SELECT * FROM input_kegiatan ORDER BY tanggal, jam;');
    console.log(JSON.stringify(res.rows, null, 2));
  } catch (err) {
    console.error(err);
  }
  process.exit();
})();