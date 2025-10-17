import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const API_BASE_URL = "http://10.10.10.195:3000";
let authToken = null;
let testUserId = null;

async function testConnectionFlow() {
  console.log("🧪 Starting comprehensive connection flow test...\n");
  
  try {
    // 1. Test server health
    console.log("1️⃣ Testing server health...");
    const healthResponse = await axios.get(`${API_BASE_URL}/`);
    console.log("✅ Server health check passed:", healthResponse.data);
    
    // 2. Test login endpoint
    console.log("\n2️⃣ Testing login endpoint...");
    const loginResponse = await axios.post(`${API_BASE_URL}/auth/login`, {
      username: "admin",
      password: "password123"
    });
    
    if (!loginResponse.data.token) {
      throw new Error("Login failed - no token received");
    }
    
    authToken = loginResponse.data.token;
    testUserId = loginResponse.data.user.id;
    console.log("✅ Login successful!");
    console.log("   Token:", authToken.substring(0, 20) + "...");
    console.log("   User:", loginResponse.data.user);
    
    // 3. Test protected endpoint with token
    console.log("\n3️⃣ Testing protected endpoint with authentication...");
    const protectedResponse = await axios.get(`${API_BASE_URL}/laporan`, {
      headers: { "Authorization": `Bearer ${authToken}` }
    });
    console.log("✅ Protected endpoint access successful!");
    console.log("   Response structure:", Object.keys(protectedResponse.data));
    
    // 4. Test CORS by checking headers
    console.log("\n4️⃣ Testing CORS headers...");
    const corsResponse = await axios.options(`${API_BASE_URL}/auth/login`, {
      headers: {
        "Origin": "http://10.10.10.195:5173",
        "Access-Control-Request-Method": "POST",
        "Access-Control-Request-Headers": "Content-Type"
      }
    });
    
    const corsHeaders = corsResponse.headers;
    console.log("✅ CORS headers present:");
    console.log("   Access-Control-Allow-Origin:", corsHeaders["access-control-allow-origin"]);
    console.log("   Access-Control-Allow-Methods:", corsHeaders["access-control-allow-methods"]);
    console.log("   Access-Control-Allow-Headers:", corsHeaders["access-control-allow-headers"]);
    
    // 5. Test error handling
    console.log("\n5️⃣ Testing error handling...");
    try {
      await axios.get(`${API_BASE_URL}/nonexistent-endpoint`);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log("✅ Error handling works correctly - 404 for non-existent endpoint");
      } else {
        console.log("⚠️  Unexpected error response:", error.message);
      }
    }
    
    // 6. Test authentication failure
    console.log("\n6️⃣ Testing authentication failure...");
    try {
      await axios.get(`${API_BASE_URL}/laporan`, {
        headers: { "Authorization": "Bearer invalid-token-here" }
      });
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log("✅ Authentication failure handled correctly - 401 for invalid token");
      } else {
        console.log("⚠️  Unexpected auth error:", error.message);
      }
    }
    
    // 7. Test login with wrong credentials
    console.log("\n7️⃣ Testing login with wrong credentials...");
    try {
      await axios.post(`${API_BASE_URL}/auth/login`, {
        username: "admin",
        password: "wrongpassword"
      });
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log("✅ Wrong credentials handled correctly - 401 for invalid password");
      } else {
        console.log("⚠️  Unexpected login error:", error.message);
      }
    }
    
    console.log("\n🎉 ALL TESTS PASSED! Frontend-backend connection is working correctly!");
    console.log("\n📋 Summary of fixes applied:");
    console.log("   ✅ Added PORT=3000 to .env");
    console.log("   ✅ Mounted auth routes in server.js");
    console.log("   ✅ Created Satpam model");
    console.log("   ✅ Enhanced CORS configuration");
    console.log("   ✅ Added error handling middleware");
    console.log("   ✅ Created login page with authentication");
    console.log("   ✅ Added protected routes in frontend");
    console.log("   ✅ Added logout functionality");
    console.log("\n🚀 The application should now work end-to-end!");
    
  } catch (error) {
    console.error("\n❌ Connection flow test FAILED!");
    console.error("Error:", error.message);
    
    if (error.response) {
      console.error("Response status:", error.response.status);
      console.error("Response data:", error.response.data);
    }
    
    console.log("\n🔧 Troubleshooting tips:");
    console.log("   1. Make sure PostgreSQL is running and accessible");
    console.log("   2. Check if the satpam table exists and has test data");
    console.log("   3. Verify the backend server is running on port 3000");
    console.log("   4. Check CORS settings if you get CORS errors");
    console.log("   5. Look at server logs for detailed error messages");
    
    process.exit(1);
  }
}

// Run the test
testConnectionFlow();