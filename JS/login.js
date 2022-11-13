// Style Pop Up

const icon = ["../IMG/checked.png", "../IMG/close.png", "../IMG/warning.png"];
const colour = ["rgb(7, 222, 0)", "rgb(238, 255, 0)", "rgb(255, 131, 131)"];
const info = document.querySelector(".container .info");
const gambar = document.querySelector(".container .info .gambar");
const img = document.querySelector(".container .info .gambar img");
const pInfo = document.querySelector(".container .info .information p");
const h3Info = document.querySelector(".container .info .information h3");

function popUpInfo(condition, posisi) {
	if (posisi == "register") {
		if (condition) {
			img.src = icon[2];
			gambar.style.backgroundColor = colour[1];
			h3Info.innerHTML = "Peringatan";
			pInfo.innerHTML = "Maaf, username sudah terpakai";
		} else {
			img.src = icon[0];
			gambar.style.backgroundColor = colour[0];
			h3Info.innerHTML = "Sukses";
			pInfo.innerHTML = "Registrasi Berhasil";
		}
	} else if (posisi == "login") {
		if (condition == false) {
			img.src = icon[1];
			gambar.style.backgroundColor = colour[2];
			h3Info.innerHTML = "Gagal";
			pInfo.innerHTML = "Username/Password tidak ditemukan";
		} else {
			img.src = icon[1];
			gambar.style.backgroundColor = colour[2];
			h3Info.innerHTML = "Gagal";
			pInfo.innerHTML = "Harap isi data dengan benar";
		}
	}
	// console.log(gambar.backgroundColor);
	info.classList.add("down");
	setTimeout(() => {
		info.classList.remove("down");
	}, 2000);
}

// Style Login dan Register
const daftarYuk = document.querySelector(".login p .daftar");
const masukYuk = document.querySelector(".judul p .btnMasuk");
const boxSection = document.querySelector(".container .boxSection");
const boxLogin = document.querySelector(".container .boxSection .boxLogin");
const boxRegister = document.querySelector(
	".container .boxSection .boxRegister"
);

const iconRegLog = document.querySelector(".container .iconRegLog img");

function showBoxLogin() {
	boxRegister.style.opacity = "0";
	iconRegLog.style.opacity = "0";
	setTimeout(() => {
		boxRegister.style.display = "none";
		boxLogin.style.display = "flex";
	}, 500);

	setTimeout(() => {
		boxLogin.style.opacity = "1";
		iconRegLog.src = "../IMG/login/login.png";
		iconRegLog.style.opacity = "1";
	}, 500);
}
function showBoxRegister() {
	boxLogin.style.opacity = "0";
	iconRegLog.style.opacity = "0";
	setTimeout(() => {
		boxLogin.style.display = "none";
		boxRegister.style.display = "flex";
	}, 500);

	setTimeout(() => {
		boxRegister.style.opacity = "1";
		iconRegLog.src = "../IMG/login/register.png";
		iconRegLog.style.opacity = "1";
	}, 500);
}

daftarYuk.addEventListener("click", () => {
	showBoxRegister();
});

masukYuk.addEventListener("click", () => {
	showBoxLogin();
});

// Catch Data and Store it in Local Storage
const STORAGE_REGISTER = "STORAGE_REGISTER";
const USER_PASS = "USER_PASS";
let personal = JSON.parse(localStorage.getItem(STORAGE_REGISTER));
if (!personal) {
	personal = [];
}
const inputForm = document.querySelectorAll(".regis-form form input");
const btnRegister = document.querySelector(".regis-form .button .regis");
let index;
let isFind;
let isClick = false;

function addRegister() {
	index = undefined;
	if (isClick) {
		for (let i = 0; i < personal.length; i++) {
			if (inputForm[2].value == personal[i].username) {
				index = i;
				isFind = true;
				break;
			}
		}
		if (index == undefined) {
			isFind == false;
			let user = {
				nama: inputForm[0].value,
				email: inputForm[1].value,
				username: inputForm[2].value,
				password: inputForm[3].value,
			};

			personal.push(user);
			showBoxLogin();
			setTimeout(() => {
				inputForm[0].value = "";
				inputForm[1].value = "";
				inputForm[2].value = "";
				inputForm[3].value = "";
			}, 1000);
			localStorage.setItem(STORAGE_REGISTER, JSON.stringify(personal));
			popUpInfo(isFind, "register");
		} else if (index != undefined) {
			inputForm[2].value = "";
			popUpInfo(isFind, "register");
			isFind = false;
		}
	}
}

btnRegister.addEventListener("click", () => {
	if (
		inputForm[0].value != "" &&
		inputForm[1].value != "" &&
		inputForm[2].value != "" &&
		inputForm[3].value != ""
	) {
		isClick = true;
		addRegister();
	} else {
		popUpInfo(true, "login");
	}
});

document.querySelector("button.btnMasuk").addEventListener("click", () => {
	inputForm.forEach((el) => {
		el.value = "";
		eyePass[1].setAttribute("src", "../IMG/hidden.png");
		eyePass[1].parentElement
			.querySelector("input")
			.setAttribute("type", "password");
	});
});

// Validasi Login
const userLogin = document.getElementById("user-login");
const userPass = document.getElementById("user-pass");
const buttonSignIn = document.querySelector(".login .sign-in");
const eyePass = document.querySelectorAll(".inputPass img");
document.querySelector("button.daftar").addEventListener("click", () => {
	userLogin.value = "";
	userPass.value = "";
	eyePass[0].parentElement
		.querySelector("input")
		.setAttribute("type", "password");
	eyePass[0].setAttribute("src", "../IMG/hidden.png");
});

function checkingData() {
	isFind = false;
	index == null;
	for (let i = 0; i < personal.length; i++) {
		if (
			userLogin.value == personal[i].username &&
			userPass.value == personal[i].password
		) {
			index = i;
			isFind = true;
			let user_pass = {
				username: personal[i].username,
				password: personal[i].password,
			};
			localStorage.setItem(USER_PASS, JSON.stringify(user_pass));
			window.open("profilPage.html", "_self");
			break;
		}
	}
	if (index != null && isFind == true) {
		userLogin.value = "";
		userPass.value = "";
	} else {
		popUpInfo(isFind, "login");
	}
}

buttonSignIn.addEventListener("click", () => {
	setTimeout(() => {
		if (userLogin.value != "" && userPass.value != "") {
			checkingData();
		} else {
			if (userLogin.value == "" || userPass.value == "") {
				popUpInfo(true, "login");
			}
		}
		userLogin.value = "";
		userPass.value = "";
	}, 300);
});

// addRegister();

// Show and hide password

eyePass.forEach((el) => {
	el.addEventListener("click", () => {
		if (el.classList.toggle("showPass")) {
			el.parentElement.querySelector("input").setAttribute("type", "text");
			el.setAttribute("src", "../IMG/view.png");
		} else {
			el.parentElement.querySelector("input").setAttribute("type", "password");
			el.setAttribute("src", "../IMG/hidden.png");
		}
	});
});
