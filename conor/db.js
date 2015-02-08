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
        gogosms: require('./sendSMS'),

        reset: function()
        {
            
        },

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
                    'userid': i, 'title':this.db.users[i].posts[j].title});
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
                users[seshid] = {};
                users[seshid].posts = [];
                users[seshid].number = number;
            }

            if (this.saves++ % 3 == 0)
            
            {
                this.save();
            }
            
        },

        addPost: function(seshid, image, title){
            console.log('adding user id ', seshid);
            this.db.users[seshid].posts.push(
                    {
                        title: title,
                        pic: image,
                        likedBy:[]
                    }
            );
            this.posts.push({
                pic:image, userid:seshid, title:title
            });
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
        },

        likePost: function(seshid, postindx)
        {

            var post = this.posts[postindx];
            console.log('post '+postindx+': ', post);
            if (!post) 
            {
                console.log('wrong indx ', postindx);
                return;
            }
            var liked = false;
            for(var i in this.db.users[post.userid].posts)
            {
                var tpost = this.db.users[post.userid].posts[i];
                if (tpost.pic == post.pic)
                {
                    liked = true;
                    if (tpost.likedBy.indexOf(seshid+'') == -1)
                    {
                        console.log('new like');
                        tpost.likedBy.push(seshid);
                    }
                    else
                    {
                        console.log('user already liked this');
                    }
                }
                break;
            }
            if(!liked)
            {
                console.log('warning, that user has no such post');
                console.log('abort');
                return;
            }
            var matchpost = this.isLikedBy(seshid, post.userid);
            if (matchpost)
            {
                console.log('WE HAVE A MATCH!!');
                var num1 = this.db.users[seshid].number;
                var num2 = this.db.users[post.userid].number;

                var item1 = matchpost.title;
                var item2 = post.title;

                this.gogosms(num1,item1,num2,item2);
            }
            else
            {
                console.log('that user doesnt like a thing back');
            }
            

        },

        // does user 1 have a post liked by user 2?
        isLikedBy: function(user1, user2)
        {   
            console.log('trying match '+user1+' - '+user2);
            if (user1 == user2) return false;
            for (var p in this.db.users[user1].posts)
            {
                var post = this.db.users[user1].posts[p];
                if (post.likedBy.indexOf(user2+'') != -1) return post;
            }
            return false;
        }

    };

    return db;
    
})()
