const navBar = document.querySelector(".navBar");
const burgerBtn = document.querySelector(".navBar-burger-btn");
const navList = document.querySelector(".navBar-navigation");

let navOpen = false;

window.onscroll = () => {
	this.scrollY > 0
		? navBar.classList.add("sticky")
		: navBar.classList.remove("sticky");
};

burgerBtn.addEventListener("click", () => {
	if (!navOpen) {
		burgerBtn.classList.add("open");
		navOpen = true;
		navList.classList.add("active");
	} else {
		burgerBtn.classList.remove("open");
		navOpen = false;
		navList.classList.remove("active");
	}
});

// new script
window.onload = () => {
	document.querySelector(".img-text").classList.add("show");
	document.querySelector(".img-1").classList.add("show");
	document.querySelector(".img-2").classList.add("show");
	document.querySelector(".img-3").classList.add("show");
};

// ==========================================
// ======== Styling Box Button Masuk ========
// ==========================================
let catchLocalStorage = JSON.parse(localStorage.getItem("USER_PASS"));
const btnMasuk = document.querySelector(".signUp-btn a");

btnMasuk.addEventListener("click", () => {
	window.open("login.html", "_self");
});

function insertAvatarUser() {
	return `
		<i class="fa fa-user-circle"></i>
							<p class="ms-2">${catchLocalStorage["username"]}</p>
   `;
}

/* <img src="../IMG/login/userNav.png" alt="" width="20px" height="20px"></img> */
let path = window.location.href.split("/");
console.log(path);
console.log(path.indexOf("HTML"));
if (catchLocalStorage) {
	btnMasuk.innerHTML = insertAvatarUser();
	btnMasuk.style.padding = "0.6rem 1rem";
	btnMasuk.addEventListener("click", () => {
		if (path.indexOf("HTML") > 0) {
			btnMasuk.setAttribute("href", "profilPage.html");
		} else {
			btnMasuk.setAttribute("href", "HTML/profilPage.html");
		}
	});
} else {
	btnMasuk.addEventListener("click", () => {
		if (path.indexOf("HTML") > 0) {
			btnMasuk.setAttribute("href", "login.html");
		} else {
			btnMasuk.setAttribute("href", "HTML/login.html");
		}
	});
}

// Read More Trigger

const aboutContent = document.querySelector(".About-content");
const moreText = document.getElementById("more");
var btnMore = document.querySelector(".myBtnMore");
var btnLess = document.querySelector(".myBtnLess");

aboutContent.addEventListener("click", (el) => {
	if (el.target.classList.contains("myBtnMore")) {
		moreText.style.display = "inline";
		btnMore.style.display = "none";
		btnLess.style.display = "inline-block";
	} else if (el.target.classList.contains("myBtnLess")) {
		moreText.style.display = "none";
		btnMore.style.display = "inline-block";
		btnLess.style.display = "none";
		window.scrollTo(0, listSection[1].offsetTop);
	}
});

// Scroll Top Trigger
const btnToTop = document.querySelector("nav .scrollToTop");
window.addEventListener("scroll", () => {
	if (window.scrollY >= 300) {
		btnToTop.classList.add("scrollTrigger");
		btnToTop.addEventListener("click", () => {
			window.scrollTo(0, 0);
		});
	} else {
		btnToTop.classList.remove("scrollTrigger");
	}
});
