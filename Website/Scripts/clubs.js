var config, db, dbRef, storage;

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
	storage = firebase.storage();
	
	dbRef = db.ref().child("clubs");
	dbEventRef = db.ref().child("event");
	
	dbRef.orderByChild("lowerName").on("child_added", function(snapshot) {
		var clubTab = document.createElement("div");
		var clubIcon = document.createElement("i");
		var clubName = document.createElement("h4");
		clubTab.className = "a-20 clubbox";
		clubIcon.className = "fa fa-" + snapshot.val().icon + " a-bg-" + snapshot.val().color;
		clubName.innerHTML = snapshot.val().name;
		clubTab.appendChild(clubIcon);
		clubTab.appendChild(clubName);
		var firstLetter = clubName.innerHTML.charAt(0).toUpperCase();
		var clubLetter = document.getElementById(firstLetter + "-Clubs");
		if (clubLetter == null) {
			clubLetter = document.createElement("div");
			var clubHeader = document.createElement("h3");
			var clubBar = document.createElement("div");
			clubLetter.id = firstLetter + "-Clubs";
			clubHeader.innerHTML = firstLetter;
			clubBar.className = "a-206-1 a-bg-grey";
			clubLetter.appendChild(clubHeader);
			clubLetter.appendChild(clubBar);
			document.getElementById("ClubScrollBox").appendChild(clubLetter);
		}
		clubLetter.appendChild(clubTab);
		$(clubTab).on("click", function() {
			var club = $(this).find("h4");
			location.href = encodeURI("clubpage.html?" + club[0].innerHTML);
		});
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

function addClub() {
	dbRef.push({
		name: $("[name='clubname']").val(),
		lowerName: $("[name='clubname']").val().toLowerCase(),
		description: $("[name='clubdescription']").val(),
		icon: $("[name='clubicon']").val(),
		color: $("[name='clubcolor']").val()
	});
}

function addEvent() {
	dbEventRef.push({
		eventName: $("[name='eventname']").val(),
		lowerEventName: $("[name='eventname']").val().toLowerCase(),
		club: $("[name='clubgroup']").val(),
		eventDescription: $("[name='eventdescription']").val(),
		startmonth: $("[name='eventstartmonth']").val(),
		startday: $("[name='eventstartday']").val(),
		startyear: $("[name='eventstartyear']").val(),
		endmonth: $("[name='eventendmonth']").val(),
		endday: $("[name='eventendday']").val(),
		endyear: $("[name='eventendyear']").val()
	});
}


function uploadPhoto() {
	var uploader = document.getElementById('uploader');
	var fileButton = document.getElementById('fileButton');
	
	//Get file
	var file = fileButton.files[0];
		
	//Create Storage Ref
	var storageRef = firebase.storage().ref('cover_photos/' + file.name);
		
	//Upload file
	var task = storageRef.put(file);
		
	//Update progress bar
	task.on('state_changed',
			
	function progress(snapshot) {
		var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
		uploader.value = percentage;
		console.log(percentage);
	},
			
	function error(err) {
				
	},
			
	function complete() {
				
	}
	);
}
