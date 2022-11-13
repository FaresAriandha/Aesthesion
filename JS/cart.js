let dataItem = JSON.parse(localStorage.getItem("ITEMS"));

// Counting Price Total
const boxPriceTotal = document.querySelector(".boxTotalAndAddress .boxPrice");
let subBeforePPN = document.querySelector(
	".boxTotalAndAddress .boxPrice .subTotalPrice .valuePrice .number"
);
let ppnPrice = document.querySelector(
	".boxTotalAndAddress .boxPrice .tax .valuePrice .number"
);
let totalPrice = document.querySelector(
	".boxTotalAndAddress .boxPrice .total .valuePrice .number"
);

const button = document.querySelectorAll(".totalItem .countItem img");
const boxCartItem = document.querySelector(".cartShopping .listCartItems");
const trashButton = document.querySelectorAll(".boxCartItem .detailDesc img");

boxCartItem.addEventListener("click", (el) => {
	if (
		el.target.classList.contains("minus") ||
		el.target.classList.contains("plus") ||
		el.target.classList.contains("trash")
	) {
		for (let i = 0; i < dataItem.length; i++) {
			if (el.target.dataset.id == dataItem[i].idItem) {
				if (el.target.classList.contains("minus")) {
					dataItem[i].totalItem--;
				} else if (el.target.classList.contains("plus")) {
					dataItem[i].totalItem++;
				} else if (el.target.classList.contains("trash")) {
					dataItem.splice(i, 1);
				}
			}
			if (dataItem[i].totalItem <= 0 && dataItem[i].totalItem != undefined) {
				dataItem.splice(i, 1);
			}
		}

		localStorage.setItem("ITEMS", JSON.stringify(dataItem));
		updateProductInCartHTML();
	}
});

const addCommaEachThreeDigit = (priceItem) => {
	let num = 1;
	let strPrice = priceItem.toLocaleString("en-US");
	return strPrice;
};

const styleWhenCartEmpty = () => {
	if (boxCartItem.classList.contains("desktop")) {
		boxCartItem.setAttribute("class", "listCartItems");
	}
	boxCartItem.classList.add("empty");
	return `<div class="emptyCart">
	<img src="../IMG/empty-cart.png" alt="" width="50px" height="50px" />
	<div class="infoCart">
		<h3>Aduuh.. Keranjangmu kosong nii</h3>
		<p>Kuy isi dengan item pilihanmu</p>
		<a href="../index.html#shop" class="btn btn-outline-secondary">Tambah</a>
	</div>
</div>`;
};

// Update Product in cart HTML
const updateProductInCartHTML = () => {
	let jumlah = 0;
	if (dataItem.length > 0) {
		let str = "";
		dataItem.forEach((data) => {
			data["totalPriceItem"] = data.basePrice * data.totalItem;

			str += `<div class="boxCartItem">
      <div class="product">
        <div class="imgItems">
          <img src="${data.imgItem}" alt="" />
        </div>
        <div class="detailDesc">
          <h3 class="title">${data.nameItem}</h3>
          <p class="shortDesc">
          ${data.descItem}
          </p>
          <span class="basePrice"
            >Rp.<span class="number">${addCommaEachThreeDigit(
							data.basePrice
						)}</span></span
          >
					<img src="../IMG/trash-bin.png" alt="" class="trash" data-id="${data.idItem}">
        </div>
      </div>
      <div class="totalItem">
        <div class="countItem">
          <img src="../IMG/minus.png" alt="" srcset="" class="minus" data-id="${
						data.idItem
					}"/>
          <span>${data.totalItem}</span>
          <img src="../IMG/plus.png" alt="" srcset="" class="plus" data-id="${
						data.idItem
					}"/>
        </div>
        <span class="subTotalPerItem"
          >Rp. <span class="number">${addCommaEachThreeDigit(
						data.totalPriceItem
					)}</span></span
        >
      </div>
    </div>`;
		});
		if (window.innerWidth < 500) {
			boxCartItem.classList.remove("desktop");
			boxCartItem.classList.add("mobile");
		} else if (window.innerWidth > 700) {
			boxCartItem.classList.remove("mobile");
			boxCartItem.classList.add("desktop");
		}
		boxCartItem.innerHTML = str;
		jumlah = dataItem.reduce((total, data) => total + data.totalPriceItem, 0);
	} else {
		jumlah = 0;
		boxCartItem.innerHTML = styleWhenCartEmpty();
		subBeforePPN.innerHTML = 0;
	}

	subBeforePPN.innerHTML = addCommaEachThreeDigit(jumlah);
	ppnPrice.innerHTML = addCommaEachThreeDigit(Math.round(jumlah * 0.1));
	totalPrice.innerHTML = addCommaEachThreeDigit(Math.round(jumlah * 1.1));
};

// Fill Shopping Cart

updateProductInCartHTML();
