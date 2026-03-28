require('dotenv').config();

const app = require('./app');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // ✅ Connect MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📚 Swagger docs: http://localhost:${PORT}/api-docs`);
    });

  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();