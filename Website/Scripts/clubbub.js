var currentPage = 3;

$(function() {
	$('.active').on('click', function() {
		var page = $(this).attr('data-page');
		moveTo(page);
	});
	for (var i = 1; i < 6; i++) {
		if (i != 3) {
			$("div[value='" + i + "']").hide();
		}
	}
});

function moveTo(page) {
	$("div[value='" + currentPage + "']").hide();
	$("div[value='" + page + "']").show();
	currentPage = page;
}