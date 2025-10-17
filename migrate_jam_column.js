import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST || "10.10.10.195",
  port: parseInt(process.env.DB_PORT || "5432"),
  database: process.env.DB_NAME || "postgres",
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASS || "password",
});

async function migrate() {
  try {
    console.log('Starting migration...');
    
    // Alter jam column to TEXT if it's TIME
    const { rows: currentType } = await pool.query(`
      SELECT data_type 
      FROM information_schema.columns 
      WHERE table_name = 'input_kegiatan' AND column_name = 'jam'
    `);
    
    if (currentType[0] && currentType[0].data_type === 'time without time zone') {
      await pool.query('ALTER TABLE input_kegiatan ALTER COLUMN jam TYPE TEXT USING jam::text');
      console.log('Altered jam column to TEXT');
    } else {
      console.log('Jam column is already TEXT or compatible');
    }
    
    await pool.end();
    console.log('Migration completed successfully');
  } catch (error) {
    console.error('Migration error:', error);
  }
}

migrate();