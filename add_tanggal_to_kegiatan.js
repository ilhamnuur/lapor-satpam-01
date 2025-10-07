import dbPromise from './db.js';

async function addTanggalColumn() {
  const pool = await dbPromise;
  try {
    // Check if column already exists
    const { rows } = await pool.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'input_kegiatan' AND column_name = 'tanggal'
    `);

    if (rows.length > 0) {
      console.log('Column tanggal already exists.');
      return;
    }

    // Add the column as DATE type
    await pool.query(`
      ALTER TABLE input_kegiatan 
      ADD COLUMN tanggal DATE
    `);

    console.log('✅ Column tanggal added successfully to input_kegiatan table.');
  } catch (err) {
    console.error('❌ Error adding column:', err);
  } finally {
    // Do not end the pool here as it's shared
  }
}

addTanggalColumn();