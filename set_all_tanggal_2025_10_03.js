import pool from './db.js';

(async () => {
  try {
    const res = await pool.query(`
      UPDATE input_kegiatan 
      SET tanggal = '2025-10-03'::date;
    `);
    console.log(`Updated ${res.rowCount} records to tanggal = 2025-10-03.`);
    
    // Verify
    const verify = await pool.query('SELECT COUNT(*) as count FROM input_kegiatan WHERE tanggal = \'2025-10-03\';');
    console.log('Records with tanggal 2025-10-03:', verify.rows[0].count);
  } catch (err) {
    console.error(err);
  }
  process.exit();
})();