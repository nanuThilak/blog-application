const signUpUserNameEle = document.getElementById("userName");
const signUpEmailEle = document.getElementById("email");
const signUpPasswordEle = document.getElementById("password");
const signUpCPasswordEle = document.getElementById("conformationPassword");
const signUpDateEle = document.getElementById("dateOfBirth");
const termsAConditionsEle = document.getElementById("termsConditons");
const signUpBtnEle = document.querySelector("#signup_btn");
const formMessageEle = document.querySelectorAll(".form_message");
const signInModel = document.querySelector(".sign_in_model");
const signupFormEle = document.querySelector(".signupForm");
const signInFormEle = document.querySelector(".signinForm");
const signInBtnEle = document.getElementById("signin_btn");
const signInUserNameEle = document.getElementById("signIn_userName");
const signInUserEmailEle = document.getElementById("signIn_email");
const signInUserPasswordEle = document.getElementById("signIn_password");
const loginUserNav = document.querySelector(".login_user");

let signUpUsers = JSON.parse(localStorage.getItem("users")) || [];
let currentLoginUser = JSON.parse(getCookie("loginUser") || "{}");
console.log(currentLoginUser);

function setCookie(name, value, days) {
  const d = new Date();
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "expires=" + d.toUTCString();
  document.cookie =
    name + "=" + encodeURIComponent(value) + ";" + expires + ";path=/";
}

function getCookie(name) {
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookies = decodedCookie.split("; ");
  for (let c of cookies) {
    const [key, value] = c.split("=");
    if (key === name) return value;
  }
  return null;
}

function deleteCookie(name) {
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

formMessageEle[0].style.color = "red";
formMessageEle[1].style.color = "red"

if (currentLoginUser.userName) {
  loginUserNav.textContent = currentLoginUser.userName;
  signInModel.classList.add("active_ele");
}

signUpBtnEle.addEventListener("click", function (e) {
  e.preventDefault();

  const userName = signUpUserNameEle.value;
  const email = signUpEmailEle.value;
  const password = signUpPasswordEle.value;
  const cPassword = signUpCPasswordEle.value;
  const dateOfBirth = signUpDateEle.value;

  if (!userName || !password || !cPassword || !email || !dateOfBirth) {
    formMessageEle[1].textContent = "Please Enter All Fields";
    return;
  }

  if (!termsAConditionsEle.checked) {
    formMessageEle[1].textContent = "Please Accept Terms & Conditions.";
    return;
  }

  if (password !== cPassword) {
    formMessageEle[1].textContent = "Password and Confirm Password doesn't match";
    return;
  }

  const emailExists = signUpUsers.some((user) => user.email === email);

  if (emailExists) {
    formMessageEle[1].textContent = "Email is already taken";
    return;
  }

  signInModel.classList.add("active_ele");

  signUpUsers.push({ userName, email, password, dateOfBirth });
  localStorage.setItem("users", JSON.stringify(signUpUsers));

  deleteCookie("loginUser");
  setCookie(
    "loginUser",
    JSON.stringify({ userName, email, password, dateOfBirth }),
    7
  );
  let currentLoginUser = JSON.parse(getCookie("loginUser") || "{}");
  console.log(currentLoginUser);
  loginUserNav.textContent = currentLoginUser.userName;
  signupFormEle.reset();
  formMessageEle[1].style.color = "green";
  formMessageEle[1].textContent = "✅ Signup successful!";
  return;
});

signInBtnEle.addEventListener("click", function (e) {

  e.preventDefault();

  const userName = signInUserNameEle.value;
  const email = signInUserEmailEle.value;
  const password = signInUserPasswordEle.value;

  if (!userName || !email || !password) {
    formMessageEle[0].textContent =
      "Please enter both email, password & userName.";
    return;
  }

  const user = signUpUsers.find(
    (u) => u.email === email && u.password === password
  );
  if(!user) {
    formMessageEle[0].textContent = "User Not Found";

  }

  deleteCookie("loginUser");
  setCookie("loginUser", JSON.stringify({ user }), 7);
  let currentLoginUser = JSON.parse(getCookie("loginUser") || "{}");
  console.log(currentLoginUser)
  loginUserNav.textContent = currentLoginUser.userName;

  signUpUsers.push({ userName, email, password, dateOfBirth });
  localStorage.setItem("users", JSON.stringify(signUpUsers));

  signInFormEle.reset();
  signInModel.classList.add("active_ele");

  formMessageEle[0].style.color = "green";
  formMessageEle[0].textContent = `✅ Welcome back, ${user.userName}!`;

  return;
});

loginUserNav.addEventListener("click", function () {
  deleteCookie("loginUser");
  let currentLoginUser = JSON.parse(getCookie("loginUser") || "{}");
  if (!currentLoginUser.userName) {
    loginUserNav.textContent = "";
    signInModel.classList.remove("active_ele");
  }
  return;
});
