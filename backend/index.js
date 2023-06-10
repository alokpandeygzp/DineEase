const express = require('express');
const app = express();
const port = 5000;
const connectToMongoDB = require('./db');
const cors = require('cors');

// Connect to MongoDB
connectToMongoDB().then(() => {
  // Set CORS headers
  app.use(cors());

  // Custom CORS headers
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    next();
  });

  // Parse JSON request bodies
  app.use(express.json());

  // Register routes
  app.use('/api', require('./Routes/CreateUser'));
  app.use('/api', require('./Routes/DisplayData'));
  app.use('/api', require('./Routes/OrderData'));

  // Hello World route
  app.get('/', (req, res) => {
    res.send('Hello World!');
  });

  // Start the server
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}).catch((err) => {
  console.log(err);
});
