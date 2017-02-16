var config, db, dbRef, authenticated;

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

function checkPasswords() {
	var pass1 = document.getElementById("password").value;
	var pass2 = document.getElementById("passwordconfirm").value;
	if (pass1 != pass2) {
		return false;
	}
	if (!addInfo()) {
		return false;
	}
	return true;
}

function addInfo() {
	authenticated = true;
	firebase.auth().createUserWithEmailAndPassword($("[name='email']").val(), $("[name='password']").val()).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
		
        if (errorCode == 'auth/weak-password') {
			alert('The password is too weak.');
        } else {
			alert(errorMessage);
        }
        console.log(error);
		
		return false;
	});
	var pass3 = document.getElementById("password").value;
	if (authenticated) {
		dbRef.push({
			firstName: $("[name='firstname']").val(),
			lastName: $("[name='lastname']").val(),
			birthday: $("[name='DOBMonth']").val() + "." + $("[name='DOBDay']").val() + "." + $("[name='DOBYear']").val(),
			school: $("[name='school']").val()
		});
	}
	return true;
}