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
});
