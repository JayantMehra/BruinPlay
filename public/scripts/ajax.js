$("body").on('submit', '#playSong', function(event) {
    event.preventDefault();
    $.get($(this).attr('action'), function(data) {
        var id = data._id;
        $("#" + id).attr("src", data.song);
        $("#" + id).removeClass("not-playing");
        $("#" + id)[0].play();
    });
});
