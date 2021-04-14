let inputElm = document.querySelector("input[name=tags]"),
	whitelist = $.getJSON(window.location.origin + "/api/game/getTags", {
		mode: "no-cors",
		credentials: "same-origin",
		format: "json",
	}).done((data) => {
		console.log(data);
	});

let tagify = new Tagify(inputElm, {
	enforceWhitelist: false,
	editTags: false,
	whitelist: inputElm.value.trim().split(/\s*,\s*/),
});

// Chainable event listeners
tagify
	.on("add", filterSelection)
	.on("remove", filterSelection)
	.on("input", onInput);

let mockAjax = (function mockAjax() {
	let timeout;
	return function (duration) {
		clearTimeout(timeout); // abort last request
		return new Promise(function (resolve) {
			timeout = setTimeout(resolve, duration || 700, whitelist);
		});
	};
})();

function onInput(e) {
	tagify.settings.whitelist.length = 0;
	tagify.loading(true).dropdown.hide.call(tagify);

	mockAjax().then(function (result) {
		tagify.settings.whitelist.push(...result, ...tagify.value);
		tagify.loading(false).dropdown.show.call(tagify, e.detail.value);
	});
}

function filterSelection() {
	let x, i, j;
	x = document.getElementsByClassName("room");
	for (i = 0; i < x.length; i++) {
		if (tagify.value.length === 0) {
			RemoveClass(x[i], "d-none");
			continue;
		}
		AddClass(x[i], "d-none");
		for (j = 0; j < tagify.value.length; j++) {
			if (
				x[i].children[2].getAttribute("value").includes(tagify.value[j].value)
			) {
				RemoveClass(x[i], "d-none");
			}
		}
	}
}

function AddClass(element, name) {
	let i, arr1, arr2;
	arr1 = element.className.split(" ");
	arr2 = name.split(" ");
	for (i = 0; i < arr2.length; i++) {
		if (arr1.indexOf(arr2[i]) === -1) {
			element.className += " " + arr2[i];
		}
	}
}

function RemoveClass(element, name) {
	let i, arr1, arr2;
	arr1 = element.className.split(" ");
	arr2 = name.split(" ");
	for (i = 0; i < arr2.length; i++) {
		while (arr1.indexOf(arr2[i]) > -1) {
			arr1.splice(arr1.indexOf(arr2[i]), 1);
		}
	}
	element.className = arr1.join(" ");
}
