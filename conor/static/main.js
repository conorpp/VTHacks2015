

$(document).ready(function(){

    console.log('sending thing');

    $.ajax({
        type: "POST",
        url: "/api",
        dataType:'json',
        data: { name: "John", location: "Boston" }

    }).done(function( msg ) {
    });

    $('#phoneButton').click(function(){
        console.log('going!');
        var num = $('#number').val();
        if (!num || !parseInt(num))
        {
            $('#numErr').html('Invalid phone number');
            return;
        }
        num = parseInt(num);
        if (num < 1000000000 || num > 9999999999)
        {
            $('#numErr').html('Invalid phone number');
            return;
        }
        window.location = '/login' + '?num=' + num;
    });
   
});
