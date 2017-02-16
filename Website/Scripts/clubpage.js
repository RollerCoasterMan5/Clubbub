var config, db, dbRef;

$(window).on("load", function() {
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
	dbRef.orderByChild("name").equalTo(clubname).on("child_added", function(snapshot) {
		var clubdescription = snapshot.val().description;
		var clubphoto = document.getElementById("clubcoverphoto");
		var studentmod = document.getElementById("studentmod");
		var teachermod = document.getElementById("teachermod");
		clubphoto.src = snapshot.val().coverphoto;
		$(".pagetitle").text(clubname);
		$(".clubdescription").children().text(clubdescription);
		studentmod.innerHTML = studentmod.innerHTML + snapshot.val().studentmod;
		teachermod.innerHTML = teachermod.innerHTML + snapshot.val().teachermod;
	});
	console.log(clubname);
});
