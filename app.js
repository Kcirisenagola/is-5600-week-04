const express = require('express');
const api = require('./api');
const middleware = require('./middleware');
const bodyParser = require('body-parser');

// Set up the server's port
const port = process.env.PORT || 3000;
// Create an instance of the app
const app = express();

// Serve static files from the public directory
app.use(express.static(__dirname + '/public'));
app.use(middleware.cors);
app.use(bodyParser.json());

// Define the routes
app.get('/', api.handleRoot);
app.get('/products', api.listProducts);
app.post('/products', api.createProduct);
app.get('/products/:id', api.getProduct);
app.delete('/products/:id', api.deleteProduct);
app.put('/products/:id', api.updateProduct);

// Error handling middleware
app.use(middleware.handleError);
app.use(middleware.notFound);

// Start the server
app.listen(port, () => console.log(`Server is running on port ${port}`));
