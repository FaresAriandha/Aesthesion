// =========================
// ===== Profil Page =======
// =========================

// Show Form Isian with Clicking Input Header

// Catch Data From Local Storage
const helloUserName = document.querySelector(
	".navBox .helloSection .userHello span"
);
const helloUserEmail = document.querySelector(".navBox .helloSection .email");
const fullName = document.querySelector(".boxProfil .commonInfo .name p");
const userName = document.querySelector(".boxProfil .commonInfo .userName p");
const emailUser = document.querySelector(".boxProfil .commonInfo .email p");
const passUser = document.querySelector(".boxProfil .commonInfo .passWord p");

let user_pass = {};
let tempRegister = [];
function checkWhoIsLogin() {
	tempRegister = JSON.parse(localStorage.getItem("STORAGE_REGISTER"));
	for (let i = 0; i < tempRegister.length; i++) {
		if (user_pass["username"] == tempRegister[i].username) {
			helloUserName.innerHTML = tempRegister[i].nama;
			fullName.innerHTML = tempRegister[i].nama;
			userName.innerHTML = tempRegister[i].username;
			emailUser.innerHTML = tempRegister[i].email;
			helloUserEmail.innerHTML = tempRegister[i].email;
			let password = tempRegister[i].password;
			let pass = "*";
			for (let j = 1; j < password.length; j++) {
				pass += "*";
			}
			passUser.innerHTML = pass;
		}
	}
}

if ((temp = localStorage.getItem("USER_PASS"))) {
	user_pass = JSON.parse(temp);
	checkWhoIsLogin();
}

// Log Out Switching User
const logOutBtn = document.querySelector(".menu a.logOut");

logOutBtn.addEventListener("click", () => {
	localStorage.removeItem("USER_PASS");
	window.open("index.html", "_self");
});
