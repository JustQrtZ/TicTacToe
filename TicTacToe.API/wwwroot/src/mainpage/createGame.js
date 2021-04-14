$(document).ready(function () {
	$("#startGame").click(function () {
		var Name = $("#gameName").val();
		var Tags = $("#gameTags").val();
		console.log({ Name }, { Tags });
		let res = $.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			url: window.location.origin + "/api/game/createGame",
			data: JSON.stringify({ Name: Name, Tags: Tags }),
			success: function (gameId) {
				console.log(gameId.id);
				localStorage.setItem("gameId", gameId.id);
				localStorage.setItem("move", "X");
				window.open("game.html", "_self");
			},
		});
	});
});
