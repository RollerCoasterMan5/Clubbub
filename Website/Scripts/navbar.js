var url = window.location.href.split('/');
var file = url[url.length-1];
var name = file.split(".")[0];
var user;

$(window).on("load", function() {
	firebase.auth().onAuthStateChanged(function(currentUser) {
		if (currentUser) {
			$(".signupbutton").hide();
			$(".loginbutton").hide();
			user = currentUser;
			console.log(user);
		} else {
			$(".logoutbutton").hide();
		}
	});
	
	$("#" + name).addClass("active");
	$(".logoutbutton").on("click", function() {
		firebase.auth().signOut();
		location.href = "clubs.html";
	});
});