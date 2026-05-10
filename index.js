const express = require('express');
const router = require('./routes/user');
const userRouter = require('./routes/user');
const { connectWithMongoDB } = require('./connection');
const logReqRes = require('./middlewares');

const app = express();
const PORT = 8000;

connectWithMongoDB('mongodb://127.0.0.1:27017/project-01');
app.use(express.urlencoded({ extended: false }));
app.use(logReqRes("log.txt"));
app.use('/api/users', userRouter);

app.listen(8000, () => {
    console.log('Server started!');
});
