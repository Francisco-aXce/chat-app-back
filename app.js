const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

// Import routes
const rootRouter = require('./src/routes/root');
const usersRouter = require('./src/routes/router');

const connectDB = require('./src/database/connection');

const app = express();

// Parse request to body-parser
app.use(bodyParser.urlencoded({ extended: true }));

dotenv.config({ path: './config.env' });
const PORT = process.env.PORT || 8080;

// MongoDB connection
connectDB();

// Use routes
app.use('/api/v1', rootRouter);
app.use('/api/v1/users', usersRouter);

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
});
