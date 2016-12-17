var currentPage = 3;
var animating = false;

$(function() {
	$('.active').on('click', function() {
		if (!animating) {
			animating = true;
			var page = $(this).attr('data-page');
			moveTo(Number(page));
		}
	});
	for (var i = 1; i < 6; i++) {
		$("div[value='" + i + "']").css({position: "absolute"})
		if (i < 3) {
			$("div[value='" + i + "']").animate(
				{ left: -1 * window.innerWidth }, {
					duration: 0,	
				});
		} else if (i > 3) {
			$("div[value='" + i + "']").animate(
				{ left: window.innerWidth }, {
					duration: 0,	
				});
		}
	}
});

function moveTo(page) {
	var screenWidth = window.innerWidth;
	if (Math.abs(currentPage - page) > 1) { //Swapping over multiple pages
		if ((currentPage - page) < 0) { //Increasing page count
			$("div[value='" + currentPage + "']").animate(
				{ left: (-1 * screenWidth) }, {
					duration: 500,
					easing: 'linear'
				});
			$("div[value='" + (currentPage + 1) + "']").animate(
				{ left: 0 }, {
					duration: 500,
					easing: 'linear'
				}).promise().done(function() {
					currentPage = currentPage + 1;
					moveTo(page);
				});
		} else { //Decreasing page count
			$("div[value='" + currentPage + "']").animate(
				{ left: screenWidth }, {
					duration: 500,
					easing: 'linear'
				});
			$("div[value='" + (currentPage - 1) + "']").animate(
				{ left: 0 }, {
					duration: 500,
					easing: 'linear'
				}).promise().done(function() {
					currentPage = currentPage - 1;
					moveTo(page);
				});
		}
	} else if (Math.abs(currentPage - page) == 1) { //Swapping over one page
		$("div[value='" + currentPage + "']").animate(
			{ left: ((currentPage - page) * screenWidth) }, {
				duration: 500,
				easing: 'easeOutBounce'
			});
		$("div[value='" + page + "']").animate(
			{ left: 0 }, {
				duration: 500,
				easing: 'easeOutBounce'
			}).promise().done(function() {
				currentPage = page;
				animating = false;
			});
	} else { //Swapping to current page
		console.log("Can't swap to current page.");
		animating = false;
	}
}

/*function autoResizeDiv()
        {
            document.getElementById('main').style.height = window.innerHeight +'px';
        }
        window.onresize = autoResizeDiv;
        autoResizeDiv();*/