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
	dbRef = db.ref().child("clubs");
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



function addClub() {
	dbRef.push({
		name: $("[name='clubname']").val(),
		lowerName: $("[name='clubname']").val().toLowerCase(),
		description: $("[name='clubdescription']").val(),
		icon: $("[name='clubicon']").val(),
		color: $("[name='clubcolor']").val()
	});
}

