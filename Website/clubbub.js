var currentPage = 3;

$(function() {
	$('.nav-button').on('click' function() {
		var page = $(this).attr('data-page');
		moveTo(page);
	});
});

function moveTo(page) {
	$("input[value='" + currentPage + "']").hide();
	$("input[value='" + page + "']").show();
	currentPage = page;
}