import { handleRegisterSubmit, validateUsername ,handleErrors } from "./script.js";
const loginsec = document.querySelector(".login-section");
const loginlink = document.querySelector(".login-link");
const registerlink = document.querySelector(".register-link");
registerlink.addEventListener("click", () => {
  loginsec.classList.add("active");
});
loginlink.addEventListener("click", () => {
  loginsec.classList.remove("active");
});
const spinner = document.getElementById("spinner");

function showSpinner() {
  spinner.style.display = "block";
}

function hideSpinner() {
  spinner.style.display = "none";
}
const form = document.getElementById("register-form");
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  showSpinner();
  const username = event.target[0].value;
  const password = event.target[2].value;
  const email = event.target[1].value;
  if (!validateUsername(username)) {
    handleErrors(["Username only contain letters, numbers, and underscores."]);
    return;
  }
  const error = await handleRegisterSubmit({ username, password, email });
  hideSpinner();
  if (error) {
    handleErrors([error]);
  } else {
    loginlink.click();
  }
});


