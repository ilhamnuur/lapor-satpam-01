import dbPromise from './db.js';

async function queryPg() {
  try {
    const pool = await dbPromise;
    const { rows: kegiatanRows } = await pool.query('SELECT * FROM input_kegiatan ORDER BY created_at DESC LIMIT 5');
    console.log('Kegiatan records:', kegiatanRows);
    
    const { rows: daftarRows } = await pool.query('SELECT * FROM daftar_hadir ORDER BY created_at DESC LIMIT 5');
    console.log('Daftar hadir records:', daftarRows);
    
    await pool.end();
  } catch (error) {
      console.error(`Error querying PostgreSQL with query: ${pool.lastSQL}, error:`, error);
  }
}

queryPg();