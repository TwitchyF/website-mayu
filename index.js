require('./settings')
const express = require('express'); 
const app = express();
var path = require('path');
var cookieParser = require('cookie-parser');
var favicon = require('serve-favicon');
var createError = require('http-errors');
var { color } = require('./library/color');
cors = require('cors'),
secure = require('ssl-express-www');

//port
const PORT = process.env.PORT || 8888

// Image title
app.use(favicon(path.join(__dirname,'public','images','favicon.ico')))

app.use(express.static(path.join(__dirname, 'public')));

var main = require('./routes/main'),
    api = require('./routes/api')
app.enable("trust proxy");
app.set("json spaces", 2);
app.use(cors())
app.use(secure)
app.use(cookieParser());
app.use('/', main)
app.use('/api', api)

app.use(function (req, res, next) {
	next(createError(404))
  })

app.use(function (err, req, res, next) {
	res.sendFile(__path + '/view/404.html')
  })

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
// red','green','yellow','blue','magenta','cyan','white']

module.exports = app
