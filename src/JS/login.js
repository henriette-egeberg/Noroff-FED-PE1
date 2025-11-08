loginButton.addEventListener("click", () => {
	console.log("Button clicked");

	fetch(`https://v2.api.noroff.dev/auth/login`, {
		method: "POST",
		body: JSON.stringify({
			email: "user@example.com",
			password: "string",
		}),
		headers: {
			"Content-type": "application/json; charset=UTF-8",
		},
	})
		.then((response) => response.json())
		.then((json) => console.log("POST Response:", json))
		.catch((error) => console.error("Error making POST request:", error));
});
