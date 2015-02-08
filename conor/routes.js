module.exports = 

function(app,db){

    var json = require('body-parser').json();
    var urlen = require('body-parser').urlencoded({extended:false});

    function auth(req){
        var cook = req.signedCookies.sessionid;
        if (db.userExists())
        {
            
        }
        else
        {
            
        }
        console.log('cooike',cook);
    }

    app.get('/', function (req, res) {
        auth(req);
        res.render('home', {name:'yo yo'});
    });

    app.get('/error', function (req, res) {
        res.render('home', {numerr:true});
    });

    app.get('/login',  function(req,res){
        if (!req.query.num)
        {
            res.redirect('/error');
            return;
        }
        console.log(req.query.num);
        var sesh = db.getNewUserId();
        res.cookie('sessionid',sesh, {signed:true});
        res.redirect('/');
    });

    app.post('/api', json, function (req, res) {
        console.log(req.body);
        res.sendStatus(200);
    });




};
