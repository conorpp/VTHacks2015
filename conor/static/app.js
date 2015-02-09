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
        $('#like').css('background-color', '#B8E68A');
        $('#notification').hide();
        console.log('Finished' + ' ' + link + index);
        if( index > 0 ) {
            index -= 1;
            $('#leftbutton').show();
        }

        if( index == 0 ) {
            $('#leftbutton').hide();
        }
        $('#mainImage').attr('src', link + index);
        updateTitle();
    });
    var updateTitle = function(){
        $('#datitle').text(titles[index % titles.length]);
    }
    $('#rightbutton').on("click", function() {
        $('#like').css('background-color', '#B8E68A');
        $('#notification').hide();
        index += 1;
        console.log('Finished' + ' ' + link + index);
        $('#leftbutton').show();
        updateTitle();
        $('#mainImage').attr('src', link + index);
    });

    $('#like').on('click', function() {
        $('#like').css('background-color', '#008200');
        console.log(index);
        $.ajax({
            type: 'POST',
            url: "/api",
            dataType:'json',
            data: { name: "like", id: index % titles.length},
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
