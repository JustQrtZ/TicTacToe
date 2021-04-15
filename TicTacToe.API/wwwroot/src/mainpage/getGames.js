$.getJSON(window.location.origin + "/api/game/getAllGames", {
	mode: "no-cors",
	credentials: "same-origin",
	format: "json",
}).done((data) => {
	data.forEach((element) => {
		$("#gameList").append(
			`<button id=${element.id} type="button" className="btn btn-light" class="room mt-3" onclick="joinGame(this)">
                        <div class="col-2">${element.name}</div>
                        <div class="col-2">${element.status}</div>
                        <div class="col-2" value=${element.tags}>${element.tags}</div>
                </button>`
		);
	});
});

function joinGame(clickedGameButton) {
	const gameId = clickedGameButton.getAttribute("id");
	const Status = clickedGameButton.children[1].innerHTML;
	if (Status === "In Progress") {
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			url: window.location.origin + "/api/game/changeGameStatus",
			data: JSON.stringify({ Id: gameId, Status: Status }),
		}).done((e) => {
			console.log(e);
		});
		localStorage.setItem("gameId", gameId);
		localStorage.setItem("move", "O");
		document.location.href = "game.html";
	} else {
		alert("U cant connected to the game");
	}
}
