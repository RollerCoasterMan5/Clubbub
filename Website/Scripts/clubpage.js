var config, db, dbRef;

$(function() {
	// Initialize Firebase
	config = {
		apiKey: "AIzaSyC8WxKKsq3az-nHvyU2Vhoth_ltr7S3uyI",
		authDomain: "clubbub-2d92f.firebaseapp.com",
		databaseURL: "https://clubbub-2d92f.firebaseio.com",
		storageBucket: "clubbub-2d92f.appspot.com",
		messagingSenderId: "246547532752"
	};
	firebase.initializeApp(config);
	db = firebase.database();
	var clubname = decodeURI(window.location.search.substring(1));
	dbRef = db.ref("clubs");
	console.log(clubname);
	dbRef.orderByChild("name").equalTo(clubname).on("child_added", function(snapshot) {
		console.log(snapshot.val().coverphoto);
		var clubdescription = snapshot.val().description;
		console.log(clubdescription);
		console.log(clubname);
		var clubphoto = document.getElementById("clubcoverphoto");
		console.log(clubphoto);
		console.log(snapshot.val().coverphoto);
		clubphoto.src = snapshot.val().coverphoto;
		$(".pagetitle").text(clubname);
		$(".clubdescription").children().text(clubdescription);
	});
	console.log(clubname);
});
