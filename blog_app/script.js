const signUpUserNameEle = document.getElementById("userName");
const signUpEmailEle = document.getElementById("email");
const signUpPasswordEle = document.getElementById("password");
const signUpCPasswordEle = document.getElementById("conformationPassword");
const signUpDateEle = document.getElementById("dateOfBirth");
const termsAConditionsEle = document.getElementById("termsConditons");
const signUpBtnEle = document.querySelector("#signup_btn");
const formMessageEle = document.querySelector(".form_message");
const signInModel = document.querySelector(".sign_in_model");
const signupFormEle = document.querySelector(".signupForm");
const signInFormEle = document.querySelector(".signinForm");
const signInBtnEle = document.getElementById("signin_btn");
const signInUserNameEle = document.getElementById("signIn_userName");
const signInUserEmailEle = document.getElementById("signIn_email");
const signInUserPasswordEle = document.getElementById("signIn_password");
const loginUserNav = document.querySelector(".login_user");

let signUpUsers = JSON.parse(localStorage.getItem("users")) || [];
let currentLoginUser = JSON.parse(localStorage.getItem("loginUser")) || [];

formMessageEle.style.color = "red";
if (currentLoginUser.user) {
  loginUserNav.textContent = currentLoginUser.user.userName;
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
    formMessageEle.textContent = "Please Enter All Fields";
    return;
  }

  if (!termsAConditionsEle.checked) {
    formMessageEle.textContent = "Please Accept Terms & Conditions.";
    return;
  }

  if (password !== cPassword) {
    formMessageEle.textContent = "Password and Confirm Password doesn't match";
    return;
  }

  const emailExists = signUpUsers.some((user) => user.email === email);

  if (emailExists) {
    formMessageEle.textContent = "Email is already taken";
    return;
  }

  signInModel.classList.add("active_ele");

  signUpUsers.push({ userName, email, password, dateOfBirth });
  localStorage.setItem("users", JSON.stringify(signUpUsers));
  localStorage.removeItem("loginUser");
  localStorage.setItem(
    "loginUser",
    JSON.stringify({ userName, email, password, dateOfBirth })
  );
  let currentLoginUser = JSON.parse(localStorage.getItem("loginUser")) || [];

  loginUserNav.textContent = currentLoginUser.user.userName;

  formMessageEle.style.color = "green";
  formMessageEle.textContent = "✅ Signup successful!";
  signupFormEle.reset();
  return;
});

signInBtnEle.addEventListener("click", function (e) {
  e.preventDefault();
  const userName = signInUserNameEle.value;
  const email = signInUserEmailEle.value;
  const password = signInUserPasswordEle.value;
  if (!userName || !email || !password) {
    formMessageEle.textContent =
      "Please enter both email, password & userName.";
    return;
  }
  const user = signUpUsers.find(
    (u) => u.email === email && u.password === password
  );

  localStorage.removeItem("loginUser");
  localStorage.setItem("loginUser", JSON.stringify({ user }));
  let currentLoginUser = JSON.parse(localStorage.getItem("loginUser")) || [];
  loginUserNav.textContent = currentLoginUser.user.userName;
  signInFormEle.reset();
  signInModel.classList.add("active_ele");
  formMessageEle.style.color = "green";
  formMessageEle.textContent = `✅ Welcome back, ${user.userName}!`;
  return;
});

loginUserNav.addEventListener("click", function () {
  localStorage.removeItem("loginUser");
  currentLoginUser = JSON.parse(localStorage.getItem("loginUser")) || [];
  loginUserNav.textContent = ""

  signInModel.classList.remove("active_ele");
  return;
});
