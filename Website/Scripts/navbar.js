var url = window.location.href.split('/');
var file = url[url.length-1];
var name = file.split(".")[0];

$(function() {
	var tab = document.getElementById(name);
	tab.className = "active";
});