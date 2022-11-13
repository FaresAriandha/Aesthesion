// ========================================
// ==== Interaksi Icon Shopping Cart ======
// ========================================

const iconShop = document.querySelector(".container .iconShopping");
const boxCart = document.querySelector(".container .boxCart");
const iconX = boxCart.querySelector(".iconX");

iconShop.addEventListener("click", () => {
	boxCart.style.transform = "scale(1)";
	updateProductInCartHTML();
});

iconX.addEventListener("click", () => {
	boxCart.style.transform = "scale(0)";
});

// ========================================
// ==== Function Shopping Cart ============
// ========================================

let productsInCart = [];
const product = document.querySelectorAll(".katalogItems .product");
const sumProduct = document.querySelector(
	".container .iconShopping .sumProduct"
);

const updateProductInCartHTML = () => {
	if (productsInCart.length > 0) {
		boxCart.style.justifyContent = "flex-start";
		let result = productsInCart.map((product) => {
			return `
				<li class="productInCart">
				<div class="quantity">
				<h3 class="Name">${product.productName}</h3>
				<button class="btn-minus" data-id="${product.Id}">-</button>
				<span>${product.count}</span>
				<button class="btn-plus" data-id="${product.Id}">+</button>
				</div>
				<div class="totalPrice">
				<span>IDR </span><span class="sumPrice">${product.totalPrice}</span><span>K</span>
				</div>
				</li>
				`;
		});
		boxCart.querySelector(".box").innerHTML = result.join("");
		sumProduct.innerText = productsInCart.length;
		sumProduct.style.transform = "scale(1)";
	} else {
		boxCart.style.justifyContent = "center";
		boxCart.querySelector(".box").innerHTML = "<h3>Keranjang masih kosong</h3>";
		sumProduct.style.transform = "scale(0)";
	}
};

function updateProductInCart(product) {
	for (let p = 0; p < productsInCart.length; p++) {
		if (productsInCart[p].Id == product.Id) {
			productsInCart[p].count += 1;
			productsInCart[p].totalPrice =
				productsInCart[p].basePrice * productsInCart[p].count;
			return;
		}
	}
	productsInCart.push(product);
}

product.forEach((items) => {
	items.addEventListener("click", (e) => {
		if (e.target.classList.contains("addToCart")) {
			const productID = e.target.dataset.id;
			const productName = items.querySelector(
				".displayInfo .productName"
			).innerText;
			const productPrice = items.querySelector(
				".displayInfo .priceValue"
			).innerText;

			let products = {
				Id: productID,
				productName: productName,
				count: 1,
				basePrice: productPrice,
				totalPrice: productPrice,
			};

			updateProductInCart(products);
			updateProductInCartHTML();
			// showData();
		}
	});
});

// function showData() {
// 	for (let i = 0; i < productsInCart.length; i++) {
// 		console.log(productsInCart[i].productName);
// 		console.log(productsInCart[i].count);
// 		console.log(productsInCart[i].totalPrice);
// 		console.log(sum);
// 	}
// }

// ========================================
// ==== Function Button + dan - ===========
// ========================================
boxCart.addEventListener("click", (el) => {
	const isPlusBtn = el.target.classList.contains("btn-plus");
	const isMinusBtn = el.target.classList.contains("btn-minus");
	if (isPlusBtn || isMinusBtn) {
		for (let i = 0; i < productsInCart.length; i++) {
			if (productsInCart[i].Id === el.target.dataset.id) {
				if (isPlusBtn) {
					productsInCart[i].count += 1;
				} else if (isMinusBtn) {
					productsInCart[i].count -= 1;
				}
				productsInCart[i].totalPrice =
					productsInCart[i].basePrice * productsInCart[i].count;
			}
			if (productsInCart[i].count <= 0) {
				productsInCart.splice(i, 1);
			}
		}
		updateProductInCartHTML();
	}
});
