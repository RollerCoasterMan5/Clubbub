var currentPage = 3;
var animating = false;

$(function() {
	$('.active').on('click', function() { //Add click listener to tab buttons
		if (!animating) {
			animating = true;
			var page = $(this).attr('data-page');
			moveTo(Number(page));
		}
	});
	for (var i = 1; i < 6; i++) { //Place other tabs out of window on startup
		$("div[value='" + i + "']").css({position: "absolute"});
		if (i < 3) {
			$("div[value='" + i + "']").css({left: (-1 * window.innerWidth)});
		} else if (i > 3) {
			$("div[value='" + i + "']").css({left: window.innerWidth});
		}
	}
});

function moveTo(page) {
	var screenWidth = window.innerWidth;
	if (Math.abs(currentPage - page) > 0) { //Swapping to different page
		if ((currentPage - page) < 0) { //Increasing page count
			$("div[value='" + currentPage + "']").animate(
				{ left: (-1 * screenWidth) }, {
					duration: 1000,
					easing: 'linear'
				});
			$("div[value='" + (currentPage + 1) + "']").animate(
				{ left: 0 }, {
					duration: 1000,
					easing: 'linear'
				}).promise().done(function() {
					currentPage = currentPage + 1;
					moveTo(page);
				});
		} else { //Decreasing page count
			$("div[value='" + currentPage + "']").animate(
				{ left: screenWidth }, {
					duration: 1000,
					easing: 'linear'
				});
			$("div[value='" + (currentPage - 1) + "']").animate(
				{ left: 0 }, {
					duration: 1000,
					easing: 'linear'
				}).promise().done(function() {
					currentPage = currentPage - 1;
					moveTo(page);
				});
		}
	} else { //Swapping to current page
		console.log("Can't swap to current page.");
		animating = false;
	}
}

window.onresize = function() { //Make sure other tabs stay out of window on resize
	for (var i = 1; i < 6; i++) {
		if (i < currentPage) {
			$("div[value='" + i + "']").css({left: (-1 * window.innerWidth)});
		} else if (i > currentPage) {
			$("div[value='" + i + "']").css({left: window.innerWidth});
		}
	}
}

/*function autoResizeDiv()
        {
            document.getElementById('main').style.height = window.innerHeight +'px';
        }
        window.onresize = autoResizeDiv;
        autoResizeDiv();*/