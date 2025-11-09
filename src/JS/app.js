const url = "https://v2.api.noroff.dev/online-shop";
console.log("App.js is connected");

// Function to populate the hero section
const createHero = async () => {
	try {
		const response = await fetch(url);
		const data = await response.json();
		const products = data && data.data ? data.data.slice(0, 3) : [];
		const heroContainer = document.querySelector(".hero");
		if (!heroContainer || products.length === 0) return;

		// clear any existing carousel interval if re-initialized
		if (heroContainer._carouselInterval) {
			clearInterval(heroContainer._carouselInterval);
			heroContainer._carouselInterval = null;
		}

		let currentIndex = 0;
		const renderSlide = (product) => {
			const imgUrl = product.image && product.image.url ? product.image.url : "";
			const imgAlt = product.image && product.image.alt ? product.image.alt : product.title || "product";
			const title = product.title || "";
			const description = product.description || "";
			const id = product.id || "";

			heroContainer.innerHTML = `

				<div class="description grid-item">
					<h1>${title}</h1>
					<p class="lg">${description}</p>
					<a href="/product/?id=${id}">"<button class="xl">Buy</button></a>
				</div>
				<div class="product-img grid-item">
					<img src="${imgUrl}" alt="${imgAlt}" style="max-width:100%;height:auto;display:block;" />
				</div>
			`;
		};

		// initial render
		renderSlide(products[currentIndex]);

		// change slide every 10 seconds
		heroContainer._carouselInterval = setInterval(() => {
			currentIndex = (currentIndex + 1) % products.length;
			renderSlide(products[currentIndex]);
		}, 10000);
	} catch (error) {
		console.error("Error fetching hero data:", error);
	}
};

// start the hero carousel
createHero();

// Function to populate the product grid

const createProduct = async () => {
	try {
		// Fetch data from the API
		const response = await fetch(url);
		const products = await response.json();
		const productList = products.data;
		console.log(products);
		// Get the first product
		// const firstProduct = products.data[0];

		// Select the product container
		const productContainer = document.querySelector(".product-container");

		// Clear the container
		productContainer.innerHTML = "";
		// Limit the product list to a maximum of 9 items
		const limitedProductList = productList.slice(0, 12);
		// Generate a product card for the first product

		limitedProductList.forEach((product) => {
			console.log("for each");

			const productCard = `
            <article class="product-card">
			<a href="product/?id=${product.id}">
				<img src="${product.image.url}" alt="${product.image.alt}" />
				<div class="rating-stars"></div>
				<div class="product-info">
					<ul>					
						<li>

							<div class="tag">${product.title}</div>
							<span class="origin-price">$${product.price}</span>
							<span class="discount-price">$${product.discountedPrice}</span>
					
						</li>
						<li>					

						</li>
					</ul>
				</div>
				</a>
			</article>
        `;

			// Append the product card to the container
			productContainer.innerHTML += productCard;
		});
	} catch (error) {
		console.error("Error fetching products:", error);
	}
};

// Call the function to generate the product card for the first item
createProduct();
