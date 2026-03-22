require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { ethers } = require("ethers");

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Test route
app.get("/", (req, res) => {
  res.send("Soltchain Backend Running 🚀");
});

// 🔥 TOKEN CREATE API
app.post("/create-token", async (req, res) => {
  try {
    const { name, symbol, supply } = req.body;

    if (!name || !symbol || !supply) {
      return res.status(400).json({
        success: false,
        error: "Missing fields"
      });
    }

    // 🔗 Blockchain connection
    const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

    // ⚠️ TEMP TEST (jab tak ABI/bytecode ready nahi)
    // Fake response de rahe hain test ke liye
    console.log("✅ API working, fake token response");

    return res.json({
      success: true,
      address: "0xTEST123456789"
    });

  } catch (error) {
    console.error("❌ Error:", error);

    res.status(500).json({
      success: false,
      error: "Server error"
    });
  }
});

// 🚀 Start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});