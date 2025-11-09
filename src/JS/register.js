// Select the button
const registerButton = document.querySelector("#registerButton"); // Replace with the actual ID or class of your button
const loginButton = document.querySelector("#loginButton"); // Replace with the actual ID or class of your button

// Add an event listener to the button
registerButton.addEventListener("click", () => {
	console.log("Button clicked");
	// Perform the POST request when the button is clicked
	const name = "Unboundix"; // Replace with a valid username
	const email = "unboundixtest@stud.noroff.no"; // Replace with a valid email
	const password = "unboundix"; // Replace with a valid password
	fetch(`https://v2.api.noroff.dev/auth/register`, {
		method: "POST",
		body: JSON.stringify({
			name: `${name}`,
			email: `${email}`,
			password: `${password}`,
		}),
		headers: {
			"Content-type": "application/json; charset=UTF-8",
		},
	})
		.then((response) => response.json())
		.then((json) => console.log("POST Response:", json))
		.catch((error) => console.error("Error making POST request:", error));
});
