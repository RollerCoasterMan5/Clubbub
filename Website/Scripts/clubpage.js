var config, db, dbRef;

$(function() {
	// Initialize Firebase
	config = {
		apiKey: "AIzaSyCX3FvJSEez60laJWWGsC4npKcQDgBYfs4",
		authDomain: "my-awesome-project-e0e92.firebaseapp.com",
		databaseURL: "https://my-awesome-project-e0e92.firebaseio.com",
		storageBucket: "my-awesome-project-e0e92.appspot.com",
		messagingSenderId: "23824945254"
	};
	firebase.initializeApp(config);
	db = firebase.database();
	var clubname = decodeURI(window.location.search.substring(1));
	dbRef = db.ref("clubs");
	dbRef.orderByChild("name").equalTo(clubname).on("child_added", function(snapshot)										 {
		var clubdescription = snapshot.val().description;
		var clubphotolocation = snapshot.val().coverphoto;
		storageRef.child(clubphotolocation).getDownloadURL().then(function(url) {
			$(".clubcoverphoto").attr("src",url);
		}).catch(function(error) {
			
		});
		$(".pagetitle").text(clubname);
		$(".clubdescription").children().text(clubdescription);
	});
});