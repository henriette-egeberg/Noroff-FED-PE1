const apiUrl = "https://v2.api.noroff.dev/online-shop";
const productContainer = document.querySelector(".product-page-container");

// Function to show a loading message
function showLoading(container) {
	container.innerHTML = "<p>Loading...</p>";
}

// Function to hide the loading message
function hideLoading(container) {
	container.innerHTML = "";
}

// Function to populate the product page
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
                <button class="shareBtnClick" style="background: none; border: none;" onclick="copyOnClick()">
                    <img class="cart_list_img" src="../../Noroff-FED-PE1/src/img/share-icon.png" alt="Product_title_info" />
                </button>
			</div>
			<div class="product-info">
				<div class="rating-stars">Star Rating: ${product.rating}</div>
				<span>Tags: ${product.tags}</span>
				<h1>${product.title}</h1>
				<p>${product.description}</p>
                
				<div>
                    <span class="origin-price lg">$${product.price}</span> 
                    <span class="discount-price lg">$${product.discountedPrice}</span>
                </div>
				<div class="buttons">
                    <a href="../../Noroff-FED-PE1/cart">"<button class="buy-now xl">Buy</button></a>
                    <button class="add-cart xl active">+</button>
                    <button class="removeCart_btn xl active">-</button>
                </div>
			</div>
            `;

		product.reviews.forEach((product) => {
			console.log("for each");
			const reviews = document.querySelector(".review-container");
			reviews.innerHTML = ""; // Clear the container before appending
			reviews.innerHTML += `				
          
					<article class="review-card grid-item">
						<span class="username lg">${product.username}</span><span class="rating-stars">Star Rating: ${product.rating}</span>
						<p class="sm">${product.description}</p>
					</article>
				
    `;
		});
		// Check if the user is authenticated
		const checkAuthentication = () => {
			const isAuthenticated = localStorage.getItem("authToken") !== null;
			const addCartBtn = document.querySelector(".add-cart");
			const removeCartBtn = document.querySelector(".removeCart_btn");

			if (isAuthenticated) {
				console.log("User is authenticated");
				// Remove the "not-logged-in" class
				addCartBtn.classList.remove("active");
				removeCartBtn.classList.remove("active");
			} else {
				console.log("User is not authenticated");
				// Add the "not-logged-in" class
				addCartBtn.classList.add("active");
				removeCartBtn.classList.add("active");
			}
		};

		// Add event listener to the login button

		// Check authentication status on page load
		checkAuthentication();

		// Add event listener to the button after rendering
		const addCart = document.querySelector(".add-cart");
		const removeCart = document.querySelector(".removeCart_btn");
		const buyBtn = document.querySelector(".buy-now");
		buyBtn.addEventListener("click", addToCart);
		addCart.addEventListener("click", addToCart);
		removeCart.addEventListener("click", removeFromCart);
	} catch (error) {
		console.error("Error fetching product page data:", error);
	}
};

// Call the function to populate the product page
createProductPage();

function addToCart() {
	console.log("Add to cart clicked");
	// Check if the cart already exists in local storage
	let cart = JSON.parse(localStorage.getItem("cart")) || [];
	const params = new URLSearchParams(window.location.search);
	const id = params.get("id");
	const title = document.querySelector(".product-info h1").textContent;
	const price = document.querySelector(".origin-price").textContent;
	const discountPrice = document.querySelector(".discount-price").textContent;
	const imageUrl = document.querySelector(".background-img").style.backgroundImage;
	console.log(id, title, price, discountPrice, imageUrl);
	console.log(imageUrl);

	// Check if the product is already in the cart
	if (cart.some((item) => item.id === id)) {
		alert("Product is already in the cart.");
	} else {
		cart.push({ id: id, title: title, price: price, discountPrice: discountPrice, imageUrl: imageUrl });
		localStorage.setItem("cart", JSON.stringify(cart));
		alert("Product added to cart!");
	}
}

function removeFromCart() {
	// Check if the cart already exists in local storage
	let cart = JSON.parse(localStorage.getItem("cart")) || [];
	const params = new URLSearchParams(window.location.search);
	const id = params.get("id");
	// Check if the product is already in the cart
	if (cart.some((item) => item.id === id)) {
		cart = cart.filter((item) => item.id !== id);
		localStorage.setItem("cart", JSON.stringify(cart));
		alert("Product removed from cart!");
	} else {
		alert("Product is not in the cart.");
	}
}
function copyOnClick() {
	let shareLink = document.querySelector(".shareBtnClick");
	shareLink.value = window.location.href;
	navigator.clipboard.writeText(shareLink.value);
	alert("Link copied");
}
//    https://www.example.com/products/12345/awesome-product-name
//    https://www.example.com/products?id=12345
//    https://www.example.com/cart/?add-to-cart=12345
