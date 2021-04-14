$(document).ready(function () {
	const hubConnection = new signalR.HubConnectionBuilder()
		.withUrl("/game")
		.build();

	hubConnection
		.start()
		.then(() => {
			hubConnection
				.invoke("JoinGroup", localStorage.getItem("gameId")) //JoinGroup is C# method name
				.catch((err) => {
					console.log(err);
				});
		})
		.catch((err) => {
			console.log(err);
		});

	hubConnection.on("Send", function (message) {
		console.log({ message });
	});

	hubConnection.on("Win", function (message) {
		alert(message);
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			url: window.location.origin + "/api/game/changeGameStatus",
			data: JSON.stringify({
				Id: localStorage.getItem("gameId"),
				Status: "Finished",
			}),
		}).done((e) => {
			console.log(e);
		});
		localStorage.removeItem("move");
		localStorage.removeItem("gameId");
		document.location.href = "main.html";
	});

	hubConnection.on("Game", function (message) {
		currentPlayer = message.turn;
		console.log(currentPlayer);
		gameState = message.msg;
		for (let i = 0; i <= gameState.length; i++) {
			document.getElementById(i.toString()).innerHTML = gameState[i];
		}
	});

	let gameActive = true;
	let currentPlayer = "X";
	let gameState = ["", "", "", "", "", "", "", "", ""];

	const winningConditions = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];

	function handleCellPlayed(clickedCell, clickedCellIndex) {
		gameState[clickedCellIndex] = currentPlayer;
		clickedCell.innerHTML = currentPlayer;
	}

	function handlePlayerChange() {
		currentPlayer = currentPlayer === "X" ? "O" : "X";
		hubConnection.invoke("Game", {
			msg: gameState,
			group: localStorage.getItem("gameId"),
			turn: currentPlayer,
		});
	}

	function handleResultValidation() {
		let roundWon = false;
		for (let i = 0; i <= 7; i++) {
			const winCondition = winningConditions[i];
			let a = gameState[winCondition[0]];
			let b = gameState[winCondition[1]];
			let c = gameState[winCondition[2]];
			if (a === "" || b === "" || c === "") {
				continue;
			}
			if (a === b && b === c) {
				roundWon = true;
				break;
			}
		}
		if (roundWon) {
			hubConnection.invoke("Game", {
				msg: gameState,
				group: localStorage.getItem("gameId"),
				turn: currentPlayer,
			});
			hubConnection.invoke("Winner", {
				Msg: "Player " + localStorage.getItem("username") + " is winner",
				group: localStorage.getItem("gameId"),
			});
			gameActive = false;
		}

		let roundDraw = !gameState.includes("");
		if (roundDraw) {
			hubConnection.invoke("Game", {
				msg: gameState,
				group: localStorage.getItem("gameId"),
				turn: currentPlayer,
			});
			hubConnection.invoke("Winner", {
				Msg: "Game is draw",
				group: localStorage.getItem("gameId"),
			});
			return;
		}

		handlePlayerChange();
	}

	function handleCellClick(clickedCellEvent) {
		if (localStorage.getItem("move") === currentPlayer) {
			const clickedCell = clickedCellEvent.target;
			const clickedCellIndex = parseInt(
				clickedCell.getAttribute("data-cell-index")
			);

			if (gameState[clickedCellIndex] !== "" || !gameActive) {
				return;
			}

			handleCellPlayed(clickedCell, clickedCellIndex);
			handleResultValidation();
		}
	}

	document
		.querySelectorAll(".cell")
		.forEach((cell) => cell.addEventListener("click", handleCellClick));
});
