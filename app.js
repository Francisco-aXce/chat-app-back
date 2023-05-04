const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

// Import routes
const rootRouter = require('./src/routes/root.routes');
const usersRouter = require('./src/routes/user.routes');

const connectDB = require('./src/database/connection');

const app = express();

app.use(morgan('tiny'));
app.use(express.json());

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
