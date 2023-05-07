const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

// Import routes
const rootRouter = require('./src/routes/root.routes');
const authRouter = require('./src/routes/auth.routes');
const chatRouter = require('./src/routes/chat.routes');

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
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/chat', chatRouter);

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
});
