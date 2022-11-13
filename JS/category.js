// Data
const category = [
	{
		ctgTitle: "Men's Fashion",
		ctgDesc:
			"Dapatkan tips fashion pria dan saran gaya setiap hari di Mofa Store.",
		tags: ["Jas", "Kemeja", "Kaos", "Kacamata", "Topi", "Jeans", "More.."],
		image: [
			"IMG/category/men/shirts.png",
			"IMG/category/men/hodie.png",
			"IMG/category/men/t-shirt_.png",
		],
	},
	{
		ctgTitle: "Women's Fashion",
		ctgDesc:
			"Temukan berbagai pakaian wanita, aksesori, kecantikan dan lainnya.",
		tags: ["Rok", "Dress", "Hijab", "Kemeja", "Kalung", "Kacamata", "More.."],
		image: [
			"IMG/category/women/blouse.png",
			"IMG/category/women/vens.png",
			"IMG/category/women/skirt.png",
		],
	},
	{
		ctgTitle: "Child's Fashion",
		ctgDesc: "Ciptakan fashion dan gaya hidup anak-anak di dunia.",
		tags: ["Jas", "Jeans", "Topi", "Kaos", "Kacamata", "Jam Tangan", "More.."],
		image: [
			"IMG/category/child/kaos.png",
			"IMG/category/child/suit.png",
			"IMG/category/child/jacket.png",
		],
	},
];

// When Clicked Shopping Cart Button
const listSection = document.querySelectorAll("section");
const ctgDesc = document.querySelector("section#category .ctgDesc");
const btnContainer = document.querySelector("section#category .button");
const btnNextPrev = btnContainer.querySelectorAll(".Btn img");

let counter = 0;

btnNextPrev.forEach((el) => {
	el.addEventListener("click", () => {
		el.parentElement.classList.add("clicked");
		setTimeout(() => {
			el.parentElement.classList.remove("clicked");
		}, 100);
		showAnimationCat();
		if (el.parentElement.classList.contains("prev")) {
			counter = counter == 0 ? 2 : --counter;
		} else {
			counter = counter == 2 ? 0 : ++counter;
		}
	});
});

function showAnimationCat() {
	listSection[2].classList.remove("muncul");
	ctgDesc.classList.remove("showItem");

	setTimeout(() => {
		listSection[2].classList.add("muncul");
		changeItemCat();
	}, 800);
}

window.addEventListener("scroll", function () {
	let wScroll = this.scrollY;

	listSection.forEach((el) => {
		let offEl = el.offsetTop;
		let heightEl = el.offsetHeight;
		let area = offEl - 150;
		if (wScroll > area) {
			el.classList.add("muncul");
		}
	});

	if (
		listSection[2].classList.contains("muncul") &&
		listSection[2].classList.contains("cat")
	) {
		changeItemCat();
		btnContainer.classList.add("show");
		listSection[2].classList.remove("cat");
	}
});

function changeItemCat() {
	ctgDesc.innerHTML = descContainer(category[counter]);

	const listTags = document.querySelectorAll(
		"section#category .ctgDesc .tags .Btn"
	);

	setTimeout(() => {
		ctgDesc.classList.add("showItem");
	}, 100);

	listTags.forEach((el, i) => {
		setTimeout(() => {
			el.classList.add("tampil");
		}, 300 * i);
	});
}

const descContainer = (ctg) => {
	let tags = ctg.tags;
	let str = `<h3 class="fw-bold">${ctg.ctgTitle}</h3>
  <p>
    ${ctg.ctgDesc}
  </p>
  <div class="tags">`;
	tags.forEach((c) => {
		str += `<button class="Btn btn-slide down">${c}</button>`;
	});
	str += `</div>`;

	const imgContainer = document.querySelector("section#category .ctgImg");

	let img = "";

	ctg.image.forEach((el) => {
		img += `<img src="${el}" alt="">`;
	});

	imgContainer.innerHTML = img;

	return str;
};
