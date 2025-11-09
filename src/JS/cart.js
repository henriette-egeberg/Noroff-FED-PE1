const url = "https://v2.api.noroff.dev/online-shop";
console.log("cart.js is connected");
let cart = JSON.parse(localStorage.getItem("cart")) || [];
console.log(cart[0].imageUrl);

const createCart = async () => {
	try {
		// Fetch data from the API
		const response = await fetch(url);
		const products = await response.json();
		const productList = products.data;
		console.log(products);
		console.log(productList);
		// Get the first product
		// const firstProduct = products.data[0];

		// Select the product container
		const productContainer = document.querySelector(".cart_list");

		// Clear the container
		productContainer.innerHTML = "";
		// Limit the product list to a maximum of 9 items
		// Generate a product card for the first product

		cart.forEach((product) => {
			console.log("for each");

			const productCard = `
            
				<article class="grid_item cart_list_container">
					<img class="cart_list_img" src="${product.imageUrl}" alt="${product.title}" />
					<div class="cart_list_desc"><span>${product.title}</span><span>Qty: 1</span><span>${product.discountPrice}</span></div>
					<div class="cart_list_button"><span>+</span><span>-</span></div>
				</article>
        `;

			// Append the product card to the container
			productContainer.innerHTML += productCard;
		});
	} catch (error) {
		console.error("Error fetching products:", error);
	}
};

// Call the function to populate the cart page
createCart();

// You can add functions to manage the cart here, such as removing items or updating quantities.
