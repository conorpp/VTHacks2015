module.exports = 
(function(){

var accountSid = 'AC89cd2f38a2b0ad1776a4c8f56c8ab21e';
var authToken = "d8213efb35ca464831c682a06b553681";
var client = require('twilio')(accountSid, authToken);

function cancelTrade(phoneNum, item1, item2) {
    item1 = item1.substring(0, 21);
    item2 = item2.substring(0, 21);
    var msg = "Sorry, hacker, your trade "
            + item1 + " for " + item2 + " was denied. "
            + "Don't give up! Head back over to swaggrhack.me, "
            + "your perfect SWAGG awaits!";
    client.messages.create({
        body: msg,
        to: phoneNum,
        from: "+12409863095"
    }, function(err, message) {
        process.stdout.write(message.sid);
    });
}

function sendMatch(phoneNum1, item1, phoneNum2, item2) {
    item1 = item1.substring(0, 17);
    item2 = item2.substring(0, 17);

    var msg1 = "Yo, hacker! Check out this SWAGG: "
             + item1 + "! Wanna trade for your "
             + item2 + "? Come to 1st floor Torg in 5"
             + " minutes or respond NO to decline.";

    var msg2 = "Yo, hacker! Check out this SWAGG: "
             + item2 + "! Wanna trade for your "
             + item1 + "? Come to 1st floor Torg in 5"
             + " minutes or respond NO to decline.";
    client.messages.create({
        body: msg1,
        to: phoneNum1,
        from: "+12409863095"
    }, function(err, message) {
        process.stdout.write(message.sid);
    });   

    client.messages.create({
        body: msg2,
        to: phoneNum2,
        from: "+12409863095"
    }, function(err, message) {
        process.stdout.write(message.sid);
    });
}

return sendMatch;

//sendMatch("+18044821204", "awesome stuff", "+18048220961", "fantastic stuff that's too long to input");
})();
