
var express = require('express'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    exphbs  = require('express-handlebars'),
    serveStatic = require('serve-static'),
    multer = require('multer'),
    app = express();

var routes = require('./routes');
var db = require('./db');


app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(cookieParser('wow such secrete 132049u32rjfe'));

// parses json, x-www-form-urlencoded, and multipart/form-data
app.use(bodyParser.json());
app.use(multer({dest:'./static/images'}));
app.use(bodyParser.urlencoded({extended:true}));

app.use('/static',express.static(__dirname + '/static'));

process.on('exit', function(code) {
});
process.on('SIGINT', function() {
    db.save();
    process.exit();
});
db.load();
routes(app,db);

var port = 80;
app.listen(port);

console.log('listening on port '+port);


