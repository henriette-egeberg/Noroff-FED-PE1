const headerRight = document.querySelector(".header-right");
headerRight.innerHTML = ""; // Clear the container before appending
headerRight.innerHTML += `				
    <li class="some">
		<a href="https://www.tiktok.com" target="_blank"><img src="../Noroff-FED-PE1/src/img/tiktok-ikon.png" alt="tiktok logo" /></a>
	</li>
	<li class="some">
		<a href="https://www.facebook.com" target="_blank"><img src="../Noroff-FED-PE1/src/img/facebook-icon.png" alt="facebook logo" /></a>
	</li>
	<li class="some">
		<a href="https://www.instagram.com" target="_blank"><img class="ig" src="../Noroff-FED-PE1/src/img/insta-icon.png" alt="instagram logo" /></a>
	</li>
	<li>
	</li>
	<li class="cart-icon">
    <a href="../../cart">
		<img class="ig" src="../Noroff-FED-PE1/src/img/cart-ikon.png" alt="Profile" />
        </a>
	</li>
    <li class="profile-icon">
    <a href="../../">
		<img class="ig" src="../Noroff-FED-PE1/src/img/profile-ikon.png" alt="profile icon" />
        </a>
	</li>
    <li class="menu-icon">

		<img class="ig" src="../Noroff-FED-PE1/src/img/menu-icon.png" alt="Menu" />
	</li>
    `;
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
const createProductPage = async () => {
	try {
		showLoading(productContainer);
		const params = new URLSearchParams(window.location.search);
		console.log(params);
		const id = params.get("id");
		console.log(id);
		if (!id) {
			container.textContent = "No product found";
			return;
		}
		// Fetch data from the API

		const response = await fetch(`${apiUrl}/${id}`);
		const products = await response.json();
		const product = products.data;
		console.log(response);
		console.log(product);
		// const product = await response.json();
		// console.log(product);
		// Clear the loading message
		hideLoading(productContainer);
		productContainer.innerHTML = ""; // Clear the container before appending
		productContainer.innerHTML += `				
			<div class="background-img grid-item product-img" style="background-image: url('${product.image.url}');">
				<span class="share-btn"></span>
			</div>
			<div class="product-info">
				<div class="rating-stars"></div>
				<span class="rating-num"></span>
				<h1>${product.title}</h1>
				<p>${product.description}</p>
				<div>
                    <span class="origin-price lg">$${product.price}</span> 
                    <span class="discount-price lg">$${product.discountedPrice}</span>
                </div>
				<div class="buttons">
                    <a href="../../cart">"<button class="buy-now xl">Buy</button></a>
                    <button class="add-cart xl">+</button>
                    <button class="removeCart_btn xl active">-</button>
                </div>
			</div>`;

		// Add event listener to the button after rendering
		const addCart = document.querySelector(".add-cart");
		const removeCart = document.querySelector(".removeCart_btn");
		addCart.addEventListener("click", addToCart);
		removeCart.addEventListener("click", removeFromCart);
	} catch (error) {
		console.error("Error fetching product page data:", error);
	}
};
