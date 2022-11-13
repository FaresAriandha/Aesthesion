function myFunction() {
	const containerCard = document.querySelector(".container .container-card");
	const container = document.querySelector(".container");
	const sectionShop = document.querySelector("section#shop");

	if (container.classList.toggle("show")) {
		sectionShop.style.height = "fit-content";
		containerCard.style.height = "fit-content";
		container.style.height = "fit-content";
	} else {
		if (window.innerWidth < 1400) {
			container.style.height = "100vh";
			sectionShop.style.height = "100vh";
			containerCard.style.height = "440px";
		} else {
			container.style.height = "100vh";
			sectionShop.style.height = "100vh";
			containerCard.style.height = "600px";
		}
	}
	window.scrollTo(0, sectionShop.offsetTop);
}

const btnReadMore = document.querySelector(".read");
if (window.innerWidth < 1400) {
	btnReadMore.style.fontSize = "16px";
} else {
	btnReadMore.style.fontSize = "1.2vw";
}

// Insert to shopping cart
let allItems = [];
if ((data = localStorage.getItem("ITEMS"))) {
	allItems = JSON.parse(data);
}
const cartButton = document.querySelector("nav .gambar img");

cartButton.addEventListener("click", () => {
	setTimeout(() => {
		window.open("HTML/cartShopping.html", "_self");
	}, 200);
});

const changeCartTotal = () => {
	const cartTotal = document.querySelector("nav .gambar span.cartTotal");
	let countCartTotal = allItems.length;
	if (countCartTotal > 0) {
		cartTotal.style.opacity = 1;
		cartTotal.innerHTML = countCartTotal;
	} else {
		cartTotal.style.opacity = 0;
	}
};

// Insert item to cart
const boxProducts = document.querySelector("#shop .container-card");
const products = document.querySelectorAll("#shop .product-card");
const btnBuy = document.querySelectorAll(
	".product-bottom-details .container-name span.BTN-buy"
);

const pushToAllItems = (item) => {
	if (allItems.length == 0) {
		allItems.push(item);
		popUpInfo(item);
	} else {
		for (let i = 0; i < allItems.length; i++) {
			if (allItems[i].idItem == item.idItem) {
				allItems[i].totalItem++;
				allItems[i]["totalPriceItem"] =
					allItems[i].totalItem * allItems[i].basePrice;
				popUpInfo(allItems[i]);
				return;
			}
		}
		allItems.push(item);
		popUpInfo(item);
	}
};

boxProducts.addEventListener("click", (el) => {
	let id = el.target.parentElement.parentElement.dataset.id;
	for (let i = 0; i < products.length; i++) {
		if (id == products[i].dataset.id) {
			let totalItem = 1;
			let idItem = id;
			let nameItem = products[i].querySelector(
				".product-details h4 a.nameItem"
			).textContent;
			let imgItem = products[i].querySelector(".product-tumb img").src;
			let basePrice = parseFloat(
				products[i]
					.querySelector(".product-details .product-price .price")
					.textContent.split(".")
					.join("")
			);
			let descItem = products[i].querySelector(
				".product-details .product-catagory"
			).textContent;
			let basePriceForModalBox = products[i].querySelector(
				".product-details .product-price"
			).innerHTML;

			let item = {
				idItem,
				nameItem,
				descItem,
				imgItem,
				basePrice,
				totalItem,
				totalPriceItem: totalItem * basePrice,
			};

			if (el.target.classList.contains("BTN-buy")) {
				console.log(el.target);
				pushToAllItems(item);
				changeCartTotal();
				localStorage.setItem("ITEMS", JSON.stringify(allItems));
			} else if (el.target.classList.contains("detailItems")) {
				console.log(el.target);
				fillDetailModal(item, basePriceForModalBox);
			}
		}
	}
});

changeCartTotal();

// Info when item in cart
const info = document.querySelector("section#shop .container .info");
const gambar = document.querySelector("section#shop .container .info .gambar");
const img = document.querySelector("section#shop .container .info .gambar img");
const pInfo = document.querySelector(
	"section#shop .container .info .information p"
);
const h3Info = document.querySelector(
	"section#shop .container .info .information h3"
);

const popUpInfo = (data) => {
	let str = `
	<div class="gambar">
		<img src="${data.imgItem}" alt="" />
	</div>
	<div class="information">
		<h3>${data.nameItem}</h3>
		<p>${data.descItem}</p>
		<p>Kamu sudah memilihnya sebanyak <span>${data.totalItem} kali</span></p>
	</div>`;

	info.innerHTML = str;

	info.classList.add("down");
	setTimeout(() => {
		info.classList.remove("down");
	}, 2000);
};

// Showing box detail info item
const detailButtons = document.querySelectorAll(
	".product-bottom-details .container-name span.detailItems"
);
const modalBox = document.querySelector(".modal-content");

const showCtgInModalBox = (ctg) => {
	let str = "";
	ctg.forEach((c) => {
		str += `<span> </span><span class="category-modal p-1">${c}</span>`;
	});

	return str;
};

const fillDetailModal = (item, bsPrice) => {
	let ctg = item.descItem.split(", ");

	let str = `	<div class="modal-header">
	<h1 class="modal-title fs-5" id="showModalLabel">
		${item.nameItem}
	</h1>
	<button
		type="button"
		class="btn-close"
		data-bs-dismiss="modal"
		aria-label="Close"
	></button>
</div>
<div class="modal-body">
	<div class="modal-pict mx-2">
		<img src="${item.imgItem}" alt="" />
	</div>
	<div class="modal-desc">
		<div class="card-body">
			<h5 class="card-title">Description</h5>
			<p class="card-text">
				Some quick example text to build on the card title and
				make up the bulk of the card's content.
			</p>
		</div>
		<ul class="list-group list-group-flush">
			<li class="list-group-item">
				<h6>Category</h6>
				<p class="my-1">
				${showCtgInModalBox(ctg)}
				</p>
			</li>
			<li class="list-group-item">
				<h6>Size</h6>
				<p>XS, S, M, L, XL, XXL</p>
			</li>
			<li class="list-group-item">
				<h6>Price</h6>
				<p>
					${bsPrice}
				</p>
			</li>
		</ul>
	</div>
</div>
<div class="modal-footer">
	<button
		type="button"
		class="btn btn-secondary"
		data-bs-dismiss="modal"
	>
		Close
	</button>
</div>`;

	modalBox.innerHTML = str;
};
