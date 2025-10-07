import pool from './db.js';

(async () => {
  try {
    const res = await pool.query(`
      UPDATE input_kegiatan 
      SET tanggal = DATE(created_at)
      WHERE tanggal IS NULL;
    `);
    console.log(`Updated ${res.rowCount} records with tanggal from created_at.`);
    
    // Verify
    const verify = await pool.query('SELECT COUNT(*) as count FROM input_kegiatan WHERE tanggal IS NOT NULL;');
    console.log('Records with tanggal:', verify.rows[0].count);
  } catch (err) {
    console.error(err);
  }
  process.exit();
})();