// Config env
const dotenv = require('dotenv');
dotenv.config({
    path: './config/.env'
});

// Import
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

// Import from file
const home = require('./routers/home.router')
const errorHandler = require('./middleware/error');

const app = express()

const PORT = process.env.PORT || 3000;

app.set(express.static('public'))

// Cookie parser
app.use(cookieParser());

if (process.env.NODE_ENV) {
    app.use(morgan('dev'))
}

app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())


// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    res.setHeader('Content-Security-Policy', `default-src 'self' 'unsafe-eval'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https: data:; img-src 'self' data: https: http:;`)

    res.setHeader('Feature-policy', `accelerometer 'none'; camera 'none'; geolocation 'none'; microphone 'none';`)
    // Pass to next layer of middleware
    next();
});

app.use('/api/v1/home', home);


app.use(errorHandler);
const server = app.listen(
    // Nó sẽ chạy các dòng tương ứng khi gõ npm + run  + <tên> (trong đoạn scripts)
    PORT,
    console.log(`App running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
// Handle unhandled promise rejecttions
process.on("unhandledRejection", (err, promise) => {
    console.log(`Error: ${err.message}`);
    // close server & exit process
    server.close(() => process.exit(1));
});