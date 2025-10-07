import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432"),
  database: process.env.DB_NAME || "postgres",
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASS || "password",
});

async function dropTanggalColumn() {
  try {
    console.log('Dropping tanggal column from input_kegiatan if exists...');
    
    // Check if column exists
    const { rows: colExists } = await pool.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'input_kegiatan' AND column_name = 'tanggal'
    `);
    
    if (colExists.length > 0) {
      await pool.query('ALTER TABLE input_kegiatan DROP COLUMN IF EXISTS tanggal');
      console.log('Dropped tanggal column from input_kegiatan');
    } else {
      console.log('tanggal column does not exist');
    }
    
    await pool.end();
    console.log('Migration completed');
  } catch (error) {
    console.error('Migration error:', error);
  }
}

dropTanggalColumn();