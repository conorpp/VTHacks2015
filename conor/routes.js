module.exports = 

function(app,db){


    var getSesh = function(req)
    {
        return req.signedCookies.sessionid;
    }
    var json = require('body-parser').json();
    var urlen = require('body-parser').urlencoded({extended:false});

    function auth(req,res){
        var cook = req.signedCookies.sessionid;
        if(!(cook && db.userExists(cook)) || cook > db.getNewUserId())
        {
            var sesh = db.getNewUserId();
            console.log('adding new user session',sesh);
            res.cookie('sessionid',sesh, {signed:true});
            db.addUser(sesh, 0);
            return false;
        }
        return true;
    }

    app.get('/', function (req, res) {
        if (auth(req,res))
            res.render('home', {});
        else
            res.render('home', {});
    });

    app.get('/trade', function (req, res) {
        res.render('trade');
    });
    app.get('/about', function (req, res) {
        res.render('about');
    });


    app.get('/upload', function (req, res) {
        if (!auth(req,res))
        {
            res.redirect('/');
        }
        else
        {
            res.render('upload', {number:!db.db.users[req.signedCookies.sessionid].number} );
        }
    });

    app.post('/uploadform', function (req, res) {
        var file;
        for (file in req.files) break;
        file = req.files[file];
        if (!req.body.title || (!file || !file.name))
        {
            console.log('invalid input file upload');
            res.render('upload', {formErr:'Invalid file upload'});
            return;
        }
        if (!db.db.users[req.signedCookies.sessionid].number)
        {
            if (!req.body.phone)
            {
                console.log('UPLOADING WITH A PHONE NUMBER!!');
                res.render('upload',{formErr:'You need to enter a valid phone number', number:1});
                db.db.users[req.signedCookies.sessionid].number = 0;
                return;
            }
            else
            {

                var num = req.body.phone;
                if (!num || !parseInt(num))
                {
                    res.render('upload',{formErr:'You need to enter a valid phone number', number:1});
                    db.db.users[req.signedCookies.sessionid].number = 0;
                    return;
                }
                num = parseInt(num);
                if (num < 1000000000 || num > 9999999999)
                {
                    res.render('upload',{formErr:'You need to enter a valid phone number', number:1});
                    db.db.users[req.signedCookies.sessionid].number = 0;
                    return;
                }
                db.db.users[req.signedCookies.sessionid].number = num;
            }
        }
        db.addPost(req.signedCookies.sessionid, file.name, req.body.title);
        res.redirect('/browse' );
    });


    app.get('/test', function (req, res) {
        res.render('ajax_test_index' );
    });
    app.get('/match', function (req, res) {
        res.render('match');
    });
    app.get('/browse', function (req, res) {
        console.log(db.getImage(0));
        var json = [];
        for (var i in db.posts)
        {
            json.push(db.posts[i].title);
        }
        console.log(json);
        if (db.getImage(0)) 
            res.render('browse', {id: 0, title: db.getImage(0).title, json: JSON.stringify(json)});
        else
            res.render('browse', {id: 0, title: 'No posts yet!', json: JSON.stringify(json)});
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
        var pic = db.getImage(parseInt(req.query.id));
        if (!pic) return res.sendCode(404);
        pic = pic.pic;

        res.sendFile(__dirname+'/static/images/' + pic,
            function(err){
                console.log('sent '+pic);
                if (err) console.log(err);
        });
    });

    app.post('/api', json, function (req, res) {
        if (auth(req,res))
        {
            console.log('user liked this ', req.body);
            console.log('user liked this ', req.query);
            db.likePost(getSesh(req),req.body.id);
        }
        else
        {
            console.log('not logged in mr');
        }
        res.write(JSON.stringify({like:false}));
        res.end();
    });

};
