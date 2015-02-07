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
        },
        posts:[],
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
            for (var i in this.db.users)
                for (var j in this.db.users[i].posts)
            {
                this.posts.push({'pic': this.db.users[i].posts[j].pic,
                                    'userid': j});
            }
        },
        save: function()
        {
            this.db.userid++;
            this.fs.writeFileSync('db.json', JSON.stringify(this.db));
            console.log('saved db');
        },
        userExists: function(sesh){
            
            (this.db.users[sesh])
                return true;
            return false;
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
        },

        getImage: function(num)
        {
            var inx = num % this.posts.length;
            console.log('indx: ', inx);
            return this.posts[num % this.posts.length];
        }

    };

    return db;
    
})()
