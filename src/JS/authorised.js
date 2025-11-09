const checkAuthentication = () => {
	const isAuthenticated = localStorage.getItem("authToken") !== null;
	const cartIcon = document.querySelector(".cart-icon");
	const profileIcon = document.querySelector(".profile-icon");

	if (isAuthenticated) {
		console.log("User is authenticated");
		// Remove the "not-logged-in" class
		cartIcon.classList.remove("active");
		profileIcon.classList.remove("active");
	} else {
		console.log("User is not authenticated");
		// Add the "not-logged-in" class
		cartIcon.classList.add("active");
		profileIcon.classList.add("active");
	}
};
// Check authentication status on page load
checkAuthentication();
