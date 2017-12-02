$("#playSong").submit(function(event) {
	event.preventDefault();
	var formData = $(this).serialize();
	var actionURL = $(this).attr('action')

	$.get(actionURL, function(data, status) {
		$("audio").attr("src", "${data.song}")
	});
});