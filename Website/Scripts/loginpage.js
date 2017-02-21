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
	dbRef = db.ref().child("users");
});

function checkUser() {
	firebase.auth().signInWithEmailAndPassword($("[name='email']").val(), $("[name='password']").val()).then(response => {
		document.forms[0].submit();
	}).catch(function(error) {
        alert(error.message);
        console.log(error);
		
		return false
	});
	return false;
}