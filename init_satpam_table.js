import dbPromise from "./db.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

async function initializeSatpamTable() {
  console.log("Initializing satpam table...");
  
  try {
    const pool = dbPromise;
    
    // Create satpam table if it doesn't exist
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS satpam (
        id_satpam SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        nama_satpam VARCHAR(100) NOT NULL,
        role VARCHAR(20) DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    
    await pool.query(createTableQuery);
    console.log("✅ satpam table created or already exists");
    
    // Check if there are any users
    const userCountResult = await pool.query('SELECT COUNT(*) as count FROM satpam');
    const userCount = parseInt(userCountResult.rows[0].count);
    
    if (userCount === 0) {
      console.log("No users found. Creating test users...");
      
      // Hash passwords
      const saltRounds = 10;
      const adminPassword = await bcrypt.hash("password123", saltRounds);
      const userPassword = await bcrypt.hash("password123", saltRounds);
      
      // Insert test users
      const insertUsersQuery = `
        INSERT INTO satpam (username, password, nama_satpam, role) VALUES
        ('admin', $1, 'Administrator', 'admin'),
        ('satpam1', $2, 'Satpam 1', 'user'),
        ('satpam2', $2, 'Satpam 2', 'user')
        ON CONFLICT (username) DO NOTHING;
      `;
      
      await pool.query(insertUsersQuery, [adminPassword, userPassword]);
      console.log("✅ Test users created:");
      console.log("   - Username: admin, Password: password123, Role: admin");
      console.log("   - Username: satpam1, Password: password123, Role: user");
      console.log("   - Username: satpam2, Password: password123, Role: user");
    } else {
      console.log(`📊 Found ${userCount} existing users in satpam table`);
      
      // List existing users (without passwords)
      const usersResult = await pool.query(`
        SELECT id_satpam, username, nama_satpam, role, created_at 
        FROM satpam 
        ORDER BY nama_satpam
      `);
      
      console.log("Existing users:");
      usersResult.rows.forEach(user => {
        console.log(`   - ${user.username} (${user.nama_satpam}) - Role: ${user.role}`);
      });
    }
    
    console.log("✅ Database initialization complete!");
    
  } catch (error) {
    console.error("❌ Error initializing satpam table:", error.message);
    process.exit(1);
  }
}

initializeSatpamTable();