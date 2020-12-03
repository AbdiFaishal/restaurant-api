const express = require('express');
const app = express();

const vendorRouter = require('./src/routes/vendorRoutes');
const orderRouter = require('./src/routes/orderRoutes');
const dishRouter = require('./src/routes/dishRoutes');

app.use(express.json()); // For parsing application/json

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Hello World!!!');
});

// API routes
app.use('/api/v1/', vendorRouter);
app.use('/api/v1/', orderRouter);
app.use('/api/v1/', dishRouter);

// Binds and listens for connections on the specified port
app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});
