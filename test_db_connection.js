import dbPromise from "./db.js";
import dotenv from "dotenv";

dotenv.config();

async function testDatabaseConnection() {
  console.log("Testing database connection...");
  console.log(`Host: ${process.env.DB_HOST}`);
  console.log(`Database: ${process.env.DB_NAME}`);
  console.log(`User: ${process.env.DB_USER}`);
  
  try {
    const pool = dbPromise;
    const result = await pool.query('SELECT NOW() as current_time, version() as db_version');
    console.log("✅ Database connection successful!");
    console.log("Current time:", result.rows[0].current_time);
    console.log("Database version:", result.rows[0].db_version);
    
    // Test if required tables exist
    const tablesToCheck = ['satpam', 'input_kegiatan'];
    
    for (const tableName of tablesToCheck) {
      try {
        const tableCheck = await pool.query(`
          SELECT EXISTS (
            SELECT FROM information_schema.tables
            WHERE table_name = $1
          ) as table_exists
        `, [tableName]);
        
        if (tableCheck.rows[0].table_exists) {
          console.log(`✅ '${tableName}' table exists`);
        } else {
          console.log(`❌ '${tableName}' table does not exist. You need to create it.`);
        }
      } catch (tableError) {
        console.error(`❌ Error checking ${tableName} table:`, tableError.message);
      }
    }
    
  } catch (error) {
    console.error("❌ Database connection failed!");
    console.error("Error:", error.message);
    console.error("Please check your database configuration in .env file");
    console.error("Make sure PostgreSQL is running and accessible");
  }
}

testDatabaseConnection();