import dbPromise from './db.js';

async function queryKegiatan() {
  try {
    const db = await dbPromise;
    const rows = await db.all('SELECT * FROM input_kegiatan ORDER BY created_at DESC');
    console.log('Kegiatan records:', rows);
    
    const daftarRows = await db.all('SELECT * FROM daftar_hadir ORDER BY created_at DESC');
    console.log('Daftar hadir records:', daftarRows);
  } catch (error) {
      console.error(`Error querying database with query: ${db.lastSQL}, error:`, error);
  }
}

queryKegiatan();