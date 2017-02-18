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

function checkPasswords() {
	var pass1 = document.getElementById("password").value;
	var pass2 = document.getElementById("passwordconfirm").value;
	if (pass1 != pass2) {
		return false;
	}
	if (!addInfo()) {
		return false;
	}
}

function addInfo() {
	firebase.auth().createUserWithEmailAndPassword($("[name='email']").val(), $("[name='password']").val()).then(user => {
		user.sendEmailVerification().then(function() {
			user.updateProfile({
				displayName: $("[name='firstname']").val() + " " + $("[name='lastname']").val(),
				photoURL: null //TODO Implement user photos on signup
			}).then(function() {
				dbRef.child(user.uid).set({
					firstName: $("[name='firstname']").val(),
					lastName: $("[name='lastname']").val(),
					birthday: $("[name='DOBMonth']").val() + "." + $("[name='DOBDay']").val() + "." + $("[name='DOBYear']").val(),
					school: $("[name='school']").val()
				});
				document.forms[0].submit();
			}).catch(function(error) {
				alert(error.message);
				console.log(error);
				
				return false;
			});
		}).catch(function(error) {
			alert(error.message);
			console.log(error);
			
			return false;
		});
	}).catch(function(error) {
        alert(error.message);
        console.log(error);
		
		return false;
	});
}