// Import required modules
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRouter = require('./routes/user');
const accountRouter = require('./routes/account');

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const dbURI = 'mongodb://localhost:27017/payTM'; 
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/user', userRouter);
app.use('/api/account', accountRouter);

// Default route for checking server
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
