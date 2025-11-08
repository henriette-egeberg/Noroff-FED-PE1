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
                    <button class="buy-now xl">Buy</button> 
                    <button class="add-cart xl">+</button>
                </div>
			</div>`;
		// Add event listener to the button after rendering
	} catch (error) {
		console.error("Error fetching product page data:", error);
	}
};

// Call the function to populate the product page
createProductPage();

//    https://www.example.com/products/12345/awesome-product-name
//    https://www.example.com/products?id=12345
//    https://www.example.com/cart/?add-to-cart=12345
