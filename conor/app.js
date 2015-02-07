
var express = require('express'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    exphbs  = require('express-handlebars'),
    app = express();

var routes = require('./routes');


app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(cookieParser('wow such secrete 132049u32rjfe'));

// parses json, x-www-form-urlencoded, and multipart/form-data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


routes(app);

app.listen(3000);

