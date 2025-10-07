import dbPromise from './db.js';

async function listTables() {
  try {
    const pool = dbPromise;
    const { rows } = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_type = 'BASE TABLE'
      ORDER BY table_name;
    `);
    console.log('Tables in database:', rows.map(row => row.table_name));
    
    // Check specific tables
    const { rows: daftarCheck } = await pool.query('SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = \'daftar_hadir\') as exists;');
    console.log('daftar_hadir exists:', daftarCheck[0].exists);
    
    const { rows: inputCheck } = await pool.query('SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = \'input_kegiatan\') as exists;');
    console.log('input_kegiatan exists:', inputCheck[0].exists);
    
    await pool.end();
  } catch (error) {
    console.error('Error listing tables:', error);
  }
}

listTables();