const express = require('express');
const urlRoute = require('./routes/url');
const shortIdRoute = require('./routes/shortId');
const staticRoute = require('./routes/staticRouter');
const connectMongoDB = require('./connection');
const URL = require('./models/url');
const path = require('path');
const methodOverride = require('method-override');

const app = express();
const PORT = 8000;

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));
app.use(methodOverride('_method'));

connectMongoDB('mongodb://127.0.0.1:27017/url-shortener');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/', staticRoute);
app.use('/url', urlRoute);
// '/:shortId'
app.use('/', shortIdRoute); 

app.listen(PORT, () => {
    console.log(`Server started on PORT ${PORT}`)
});
