document.addEventListener("DOMContentLoaded", function() {	
	document.getElementById("submit_button").addEventListener("click", submit);
	document.getElementById("clear_button").addEventListener("click", () => sendRequest('clear.php', ""));

	document.getElementsByName("xbuttons").forEach(x => x.addEventListener("click", xHandler));
});

function submit() {
	if (checkX() && checkY() && checkR()) {

		const data = "x=" + document.getElementById("clicked_button").value
					+ "&y=" + document.getElementById("y").value
					+ "&r=" + checkR();

		sendRequest("calculator.php", data);
	}
}

function checkR() {
	let rButtons = document.getElementsByName("radio_buttons");
	let rVal;
	rButtons.forEach( r => {
		if (r.checked) rVal = r.value;
	})
	if(rVal === undefined){
		alert("R button must be clicked!");
	}
	return rVal; /*Here we are depending on falsey values, as undefined
				  will be interpreted as false in our submit function.
				  NOTICE: rVal can never be any other falsey value,
				  except undefined. It possible values: {1, 1.5, 2, 2.5, 3}.
				  */
}

function checkY() {
	let y = document.getElementById("y");
	let yVal = y.value.replace(",", ".");
	if (yVal === "") {
		alert("Y field must be filled!");
		return false;
	}
	else if (isNaN(yVal)){
		alert("Y must be a number!");
		return false;
	}
	else if (yVal >= 3 || yVal <= -5) {
		alert("Y must be in range: (-5; 3)!");
		return false;
	} else {
		return true;
	}
}

function checkX() {
	let xVal = document.getElementById("clicked_button");
	if (xVal === null){
		alert("X button must be clicked!")
	} else {
		return true;
	}
}

function xHandler() {
	let xButtons = document.getElementsByName("xbuttons");
	let x = event.path[0];
	let xVal = event.path[0].value;

	for (var i = 0; i < xButtons.length; i++) {
		xButtons[i].setAttribute("id", "x" + i);
	}
	x.setAttribute("id", "clicked_button")
}

function sendRequest(url, data) {

	httpPost(url, data)
		.then(response => {
			if (response !== ""){
            	document.getElementById("result_table").innerHTML = response;
			}
        	else{
            	alert("Error in the request");
        	}

		})
		.catch(error => {
			if(error === 400) {
            	alert("Error in the request");
			}
        	else {
            	alert("Unknown Error");
        	}
		})
}

function httpPost(url, data) {
	return new Promise(
		(resolve, reject) => {
			const xhr = new XMLHttpRequest();
			xhr.onload = () => {
				if (xhr.status === 200) {
					resolve(xhr.responseText);
				} else {
					reject(new Error(xhr.statusText));
				}
			}
			xhr.onerror = () => {
				reject(new Error("Network error"));
			}
			xhr.open("POST", url);
			xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			xhr.send(data);
		});
}

