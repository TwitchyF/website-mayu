require('./settings')
const express = require('express'); 
const app = express();
var path = require('path');
var cookieParser = require('cookie-parser');
var favicon = require('serve-favicon');
var createError = require('http-errors');
var { color } = require('./lib/color');
cors = require('cors'),
secure = require('ssl-express-www');

const PORT = process.env.PORT || 8080 || 5000 || 3000

// Image title
app.use(favicon(path.join(__dirname,'public','images','favicon.ico')))

app.use(express.static(path.join(__dirname, 'public')));

var main = require('./routes/main'),
    api = require('./routes/api')

app.set('trust proxy', true);
app.set("json spaces",2)
app.use(cors())
app.use(secure)
app.use(cookieParser());
app.use(express.static("public"))
app.use('/', main)
app.use('/api', api)

app.use(function (req, res, next) {
	next(createError(404))
  })

app.use(function (err, req, res, next) {
	res.sendFile(__path + '/view/404.html')
  })

// red','green','yellow','blue','magenta','cyan','white']
app.listen(PORT, () => {
    console.log(color("<=====[ START HOSTING ]=====>",'red'))
    console.log(color("Server running on port " + PORT,'white'))
})

module.exports = app
