module.exports = 

function(app,db){

    var json = require('body-parser').json();
    var urlen = require('body-parser').urlencoded({extended:false});

    function auth(req){
        var cook = req.signedCookies.sessionid;
        console.log('cooike',cook);
        return cook && db.userExists(cook);
    }

    app.get('/', function (req, res) {
        if (auth(req))
            res.render('home_auth', {});
        else
            res.render('home', {});
    });

    app.get('/trade', function (req, res) {
        res.render('trade' );
    });

    app.post('/post', function (req, res) {
        res.render('collection' );
    });

    app.get('/test', function (req, res) {
        res.render('test' );
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

    app.get('/image', function (req, res) {
        console.log(req.body);
        var id = parseInt(req.query.id);
        if (id != 0 && !id)
        {
            console.log('invlaid id');
            return;
        }
        
        res.sendFile(__dirname+'/static/images/' + db.getImage(parseInt(req.query.id)).pic,
            function(err){
                console.log('sent '+db.getImage(0).pic);
        });
    });


};
