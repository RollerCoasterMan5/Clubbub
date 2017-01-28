var config, db, dbEventRef, storage;

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

	dbClubRef = db.ref().child("clubs");
	dbEventRefRef = db.ref().child("events");
	
	dbClubRef.orderByChild("lowerName").on("child_added", function(snapshot) {
		var cluboption = document.createElement("option");
		cluboption.value = snapshot.val().name;
		cluboption.innerHTML = snapshot.val().name;
		$("[name='club']").append(cluboption);
	});
});

function formatDates(snapshot) {
	var startMonth = snapshot.val().eventstartmonth;
	var startDay = snapshot.val().eventstartday;
	var startYear = snapshot.val().eventstartyear;
	var endMonth = snapshot.val().eventendmonth;
	var endDay = snapshot.val().eventendday;
	var endYear = snapshot.val().eventendyear;
	
	var startdate = startYear + "-";
	switch(startMonth) {
		case January:
			startdate += "01-"
			break;
		case February:
			startdate += "02-"
			break;
		case March:
			startdate += "03-"
			break;
		case April:
			startdate += "04-"
			break;
		case May:
			startdate += "05-"
			break;
		case June:
			startdate += "06-"
			break;
		case July:
			startdate += "07-"
			break;
		case August:
			startdate += "08-"
			break;
		case September:
			startdate += "09-"
			break;
		case October:
			startdate += "10-"
			break;
		case November:
			startdate += "11-"
			break;
		case December:
			startdate += "12-"
			break;
		default:
			console.log("ERROR!");
	}
	startdate += startDay;
}

function addEvent() {
	dbEventRef.push({
		name: $("[name='eventname']").val(),
		lowerName: $("[name='eventname']").val().toLowerCase(),
		club: $("[name='clubgroup']").val(),
		description: $("[name='eventdescription']").val(),
		startMonth: $("[name='eventstartmonth']").val(),
		startDay: $("[name='eventstartday']").val(),
		startYear: $("[name='eventstartyear']").val(),
		endMonth: $("[name='eventendmonth']").val(),
		endDay: $("[name='eventendday']").val(),
		endYear: $("[name='eventendyear']").val()
	});
}