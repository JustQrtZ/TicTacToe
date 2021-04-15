$(document).ready(function () {
	$("#startGame").click(function () {
		let Name = $("#gameName").val();
		let Tags = $("#gameTags").val();
		if(Name.length>=3 && Tags.length>= 3) {
			let res = $.ajax({
				type: "POST",
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				url: window.location.origin + "/api/game/createGame",
				data: JSON.stringify({Name: Name, Tags: Tags}),
				success: function (gameId) {
					console.log(gameId.id);
					localStorage.setItem("gameId", gameId.id);
					localStorage.setItem("move", "X");
					window.open("game.html", "_self");
				},
			});
		}
		else 
		{
			alert("Minimum length of the Name and Tags is 3 character!!!")
		}
	});
});
