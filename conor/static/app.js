$(document).ready(function() {
    $('.thumbnail').on("click", function() {
        $('#mainImage').hide();
        $('#imageWrap').css('background-image', "url('loading.gif')");
        var i = $('<img />').attr('src',this.href).load(function() {
            $('#mainImage').attr('src', i.attr('src'));
            $('#imageWrap').css('background-image', 'none');
            $('#mainImage').fadeIn();
        });
        return false;
    });

    var link = '/image?id=';
    var index = 0;
    $('#leftbutton').hide();

    $('#leftbutton').on("click", function() {
        $('#notification').hide();
        $('#mainImage').attr('src', link + index);
        console.log('Finished' + ' ' + link + index);
        if( index > 0 ) {
            index -= 1;
            $('#leftbutton').show();
        }

        if( index == 0 ) {
            $('#leftbutton').hide();
        }
    });

    $('#rightbutton').on("click", function() {
        $('#notification').hide();
        $('#mainImage').attr('src', link + index);
        index += 1;
        console.log('Finished' + ' ' + link + index);
        $('#leftbutton').show();
    });

    $('#mainImage').on('click', function() {
        console.log(index);
        $.ajax({
            type: 'POST',
            url: "/api",
            dataType:'json',
            data: { name: "like", id: index },
            success: function(data) {
                console.log(data);
                if(data.like) {
                    window.location = "http://www.yoururl.com";
                }
                else {
                    $('#notification').hide();
                }
            }
        });
    });
});
