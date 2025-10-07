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
    
    // Test if satpam table exists
    try {
      const tableCheck = await pool.query(`
        SELECT EXISTS (
          SELECT FROM information_schema.tables 
          WHERE table_name = 'satpam'
        ) as table_exists
      `);
      
      if (tableCheck.rows[0].table_exists) {
        console.log("✅ 'satpam' table exists");
        
        // Check if there are any users
        const userCount = await pool.query('SELECT COUNT(*) as count FROM satpam');
        console.log(`📊 Total satpam users: ${userCount.rows[0].count}`);
        
        if (parseInt(userCount.rows[0].count) === 0) {
          console.log("⚠️  No users found in satpam table. You may need to create some test users.");
        }
      } else {
        console.log("❌ 'satpam' table does not exist. You need to create it.");
      }
    } catch (tableError) {
      console.error("❌ Error checking satpam table:", tableError.message);
    }
    
  } catch (error) {
    console.error("❌ Database connection failed!");
    console.error("Error:", error.message);
    console.error("Please check your database configuration in .env file");
    console.error("Make sure PostgreSQL is running and accessible");
  }
}

testDatabaseConnection();