var url = window.location.href.split('/');
var file = url[url.length-1];
var name = file.split(".")[0];

$(window).on("load", function() {
	console.log(name);
	$("#" + name).addClass("active");
});