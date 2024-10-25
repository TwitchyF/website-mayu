require('../settings');
const express = require('express');
const app = express();
var path = require('path');
var cookieParser = require('cookie-parser');
var favicon = require('serve-favicon');
var createError = require('http-errors');
var { color } = require('../library/color');
const cors = require('cors');
// const secure = require('ssl-express-www'); // Uncomment if needed

const PORT = process.env.PORT || 809;  // Port otomatis dari environment

// Memastikan favicon ada di path yang benar
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

// Routes
var main = require('./routes/main'),
    api = require('./routes/api');

// Pengaturan dasar aplikasi
app.set('trust proxy', true);
app.set("json spaces", 2);
app.use(cors());
// app.use(secure); // Komentar dulu untuk mencegah redirect bermasalah
app.use(cookieParser());
app.use(express.static("public"));

// Gunakan routing
app.use('/', main);
app.use('/api', api);

// Handling 404 Not Found
app.use(function (req, res, next) {
    next(createError(404));
});

// Error handler, pastikan 404.html ada di path yang benar
app.use(function (err, req, res, next) {
    console.log("Error occurred:", err.message); // Debugging log
    res.status(err.status || 500);
    
    // Pastikan __dirname digunakan untuk mengambil path yang benar
    res.sendFile(path.join(__dirname, 'view', '404.html'));
});

// Export the handler for Netlify Functions
module.exports.handler = require('serverless-http')(app);
