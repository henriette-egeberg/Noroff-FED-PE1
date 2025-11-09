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

// function to add product to cart

// function to remove product from cart

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
		const addCartToggle = document.querySelector(".add-cart");
		const removeCartBtn = document.querySelector(".removeCart_btn");
		addCartToggle.classList.toggle("active");
		removeCartBtn.classList.toggle("active");
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
		const addCartToggle = document.querySelector(".add-cart");
		const removeCartBtn = document.querySelector(".removeCart_btn");
		addCartToggle.classList.toggle("active");
		removeCartBtn.classList.toggle("active");
	} else {
		alert("Product is not in the cart.");
	}
}
addToCart();
removeFromCart();

//    https://www.example.com/products/12345/awesome-product-name
//    https://www.example.com/products?id=12345
//    https://www.example.com/cart/?add-to-cart=12345
