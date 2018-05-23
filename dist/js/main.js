"use strict";

window.onload = function () {
	var request = new XMLHttpRequest();
	var url = "http://localhost:3000/json/products.json";

	request.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			var response = JSON.parse(this.responseText);
			console.log(response[0].data);
		}
	};
	request.open("GET", url, true);
	request.send();
};