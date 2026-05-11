require('dotenv').config();

// Packages
const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');

// Routers
const urlRoute = require('./routes/url');
const shortIdRoute = require('./routes/shortId');
const staticRoute = require('./routes/staticRouter');
const userRouter = require('./routes/user');

// Miscellaneous
const connectMongoDB = require('./connection');
const URL = require('./models/url');
const { strictLogin, checkAuthenticated } = require('./middlewares/auth');

const app = express();
const PORT = process.env.PORT || 8001;
const MONGO_URL = process.env.MONGO_URL;

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

connectMongoDB(MONGO_URL);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(cookieParser());

// '/url'
app.use('/url', strictLogin, urlRoute);

// '/'
app.use('/', checkAuthenticated, staticRoute);

// '/:shortId'
app.use('/', shortIdRoute);

// '/user'
app.use('/user', userRouter);

app.listen(PORT, () => {
    console.log(`Server started on PORT ${PORT}`);
});
