var config, db, dbClubRef, dbFeedRef, storage;

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

	dbClubRef = db.ref().child("clubs");
	dbFeedRef = db.ref().child("feed");
		
	dbClubRef.orderByChild("lowerName").on("child_added", function(snapshot) {
		var cluboption = document.createElement("option");
		cluboption.value = snapshot.val().name;
		cluboption.innerHTML = snapshot.val().name;
		$("[name='club']").append(cluboption);
	});
	
	dbFeedRef.orderByChild("time").on("child_added", function(snapshot) {
		var feedTable = document.getElementById("feedtable");
		var messageRow = document.createElement("tr");
		var messageDiv = document.createElement("div");
		var firstColumn = document.createElement("td");
		var profileDiv = document.createElement("div");
		var profileIcon = document.createElement("img");
		var profileName = document.createElement("p");
		var timePosted = document.createElement("h6");
		var secondColumn = document.createElement("td");
		var clubName = document.createElement("h3");
		var feedMessage = document.createElement("p");
		
		var dateUTC = new Date(parseInt(snapshot.val().time)).toString().split(" ");
		var messageDate = dateUTC[1] + " " + dateUTC[2] + ", " + dateUTC[3];
		
		profileIcon.src = "TestAvatar.jpg";
		profileIcon.id = "profile_pic";
		
		profileName.style = "color:black;";
		profileName.innerHTML = snapshot.val().author;
		
		timePosted.style = "color:#A9A9A9; font-size: 1em; margin-top: 0px !important;";
		timePosted.innerHTML = messageDate;
		
		profileDiv.className = "a-112"
		profileDiv.appendChild(profileIcon);
		profileDiv.appendChild(profileName);
		profileDiv.appendChild(timePosted);
		
		firstColumn.id = "first_column";
		firstColumn.appendChild(profileDiv);
		
		clubName.style = "font-size:24px;";
		clubName.innerHTML = snapshot.val().club;
		
		feedMessage.id = "feeddescription";
		feedMessage.innerHTML = snapshot.val().message;
		
		secondColumn.id = "second_column";
		secondColumn.appendChild(clubName);
		secondColumn.appendChild(feedMessage);
		
		messageDiv.className = "a-136 a-br a-br-blue";
		messageDiv.id = "messagebox";
		messageDiv.appendChild(firstColumn);
		messageDiv.appendChild(secondColumn);
		
		messageRow.appendChild(messageDiv);
		
		feedTable.insertBefore(messageRow, feedTable.childNodes[0]);
	});
});

function addFeedMessage() {
	if (user.emailVerified) {
		dbFeedRef.push({
			message: $("[name='feeddescription']").val(),
			author: user.displayName,
			club: $("[name='club']").val(),
			time: Date.now().toString()
		});
	} else if (user) {
		alert("Please verify your e-mail before adding feed posts.");
	} else {
		alert("Please signup or login before adding feed posts.");
	}
}