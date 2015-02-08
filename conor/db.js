module.exports = 
(function(){
    /*
    var ex_user = {
        'sessionid':{
            posts:
            [
            {'title':'sticker','pic':'path-to-pic',
                likedBy:['sessionid','sessionid']},
            ],
            number:'1234567890'
        }
    }
    */
   
    var db = 
    {
        db: {
            userid: 0,
            users: {},
        },
        saves:0,
        fs: require('fs'),

        load: function()
        {
            var d = this.fs.readFileSync('db.json').toString();
            d = JSON.parse(d);
            console.log(d);
            if (d)
                this.db = d;
            else
                throw('corrupt db');
        },
        save: function()
        {
            this.db.userid++;
            this.fs.writeFileSync('db.json', JSON.stringify(this.db));
            console.log('saved db');
        },
        addUser: function(seshid, number)
        {
            var users = this.db.users;
            if (!users[seshid])
            {
                
            }
            else
            {
                users[seshid].number = number;
            }

            if (this.saves % 3 == 0)
            {
                this.save();
            }
            
        },
        getNewUserId: function()
        {
            return this.db.userid++;
        }

    };

    return db;
    
})()
