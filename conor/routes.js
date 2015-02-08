module.exports = 

function(app,db){

    var json = require('body-parser').json();
    var urlen = require('body-parser').urlencoded({extended:false});

    function auth(req){
        var cook = req.signedCookies.sessionid;
        console.log('cooike',cook);
    }

    app.get('/', function (req, res) {
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

<<<<<<< HEAD
    app.post('/api', json, function (req, res) {
        console.log(req.body);
        res.sendStatus(200);
    });




};
=======
    app.get('/test', function (req, res) {
        res.render('test',{'name':'colin'});
    });

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
}
>>>>>>> c6415f60764701ffef5dc2fcea20c1749690f767
