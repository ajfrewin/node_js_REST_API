// App guide, set paths and stuff, is this the front-end part?

// import base stuff
const express = require('express');
const app = express();

// import middlewear
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
mongoose.Promise = global.Promise

// project-specific routes
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

mongoose.connect("mongodb+srv://shopAdmin:shopAdminPwd@node-rest-shop-n2c91.mongodb.net/test?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

let db = mongoose.connection;
db.once('open', () => console.log('connected to db'));

// configure middlewear
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Handle CORS errors
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", '*');
    res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method == 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
        return res.status(200).json({});
    }
    next();
});

// Routes to handle requests
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

// Handle any request that reaches this line (aka page not found)
app.use((req, res, next) => {
    const error = new Error('Page Not found');
    error.status = 404;
    next(error);
});

// point to this for any kind of error
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});
module.exports = app;
