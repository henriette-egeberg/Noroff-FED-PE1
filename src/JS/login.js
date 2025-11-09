loginButton.addEventListener("click", () => {
	console.log("Button clicked");

	fetch(`https://v2.api.noroff.dev/auth/login`, {
		method: "POST",
		body: JSON.stringify({
			email: "unboundixtest@stud.noroff.no",
			password: "unboundix",
		}),
		headers: {
			"Content-type": "application/json; charset=UTF-8",
		},
	})
		.then((response) => response.json())
		.then((json) => {
			console.log("POST Response:", json);
			console.log(json);
			console.log(json.data.accessToken);
			// Store the token in local storage
			localStorage.setItem("authToken", json.data.accessToken);

			// Check authentication status after storing token
			const isAuthenticated = localStorage.getItem("authToken") !== null;
			if (isAuthenticated) {
				console.log("User is authenticated");
				const login_form = document.querySelector(".login-form");
				login_form.innerHTML = "<h1>Login successful!</h1>";
			} else {
				console.log("User is not authenticated");
			}
		})
		.catch((error) => console.error("Error making POST request:", error));
});

// You can expand this with actual login/logout functions as needed.
