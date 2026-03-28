
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const mongoose = require('mongoose');

const connectDB = require('./src/config/database');
const errorHandler = require('./src/utils/errorHandler');

const app = express();

// Connect DB
connectDB();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// Rate limit
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
}));

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Sanitization
//app.use(mongoSanitize());
//app.use(xss());

// Routes (FIXED PATHS)
app.use('/api/v1/auth', require('./src/routes/auth'));
app.use('/api/v1/tasks', require('./src/routes/tasks'));

// Root route (for quick API check)
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Health check
app.get('/api/v1/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    mongodb: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
  });
});


// Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Task Manager API',
      version: '1.0.0',
      description: 'JWT Auth + RBAC + MongoDB'
    },
    servers: [{ url: `http://localhost:${process.env.PORT || 5000}` }]
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    }
  },
  apis: ['./src/routes/*.js']
};

const specs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Error handler
app.use(errorHandler);

module.exports = app;