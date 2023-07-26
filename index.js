import {
  handleRegisterSubmit,
  validateUsername,
  showRegSpinner,
  hideRegSpinner,
} from "./register.js";
import {
  handleLoginSubmit,
  showLoginSpinner,
  hideLoginSpinner,
  logedIn,
  logedOut,
} from "./login.js";
import { handleFileUpload, validateFile } from "./file.js";
const loginsec = document.querySelector(".login-section");
const loginlink = document.querySelector(".login-link");
const registerlink = document.querySelector(".register-link");
const registerFrom = document.querySelector("#register-form");
const loginFrom = document.querySelector("#login-form");
const errorContainer = document.querySelector("#register-errors");
const baseUrl = "http://localhost:4000";
const loginSection = document.querySelector(".login-section");
const formBox = document.querySelector(".form-box");
const fileInput = document.querySelector("#file-input");
const fileName = document.querySelector("#file-name");
const logoutBtn = document.querySelector("#logout");
const allowedFiles = [".pdf", ".docx", ".doc", ".txt", ".xls"];
fileInput.setAttribute("accept", allowedFiles.join(", "));
// loginSection.style.display = 'none';
formBox.style.display = "none";
if (localStorage.getItem("token")) {
  logedIn();
} else {
  logedOut();
}
logoutBtn.addEventListener("click", () => logedOut());
registerlink.addEventListener("click", () => {
  loginsec.classList.add("active");
});
loginlink.addEventListener("click", () => {
  removeErrors();
  loginsec.classList.remove("active");
});

registerFrom.addEventListener("submit", async (event) => {
  event.preventDefault();
  showRegSpinner();
  const username = event.target[0].value;
  const email = event.target[1].value;
  const password = event.target[2].value;
  if (!validateUsername(username)) {
    handleErrors(["Username only contain letters, numbers, and underscores."]);
    return;
  }
  if (!validatePassword(password)) {
    return handleErrors([
      "password to be at least 8 characters long and contain at" +
        " least one uppercase letter, one lowercase letter, and one digit.",
    ]);
  }
  const error = await handleRegisterSubmit({ username, password, email });
  hideRegSpinner();
  if (error) {
    handleErrors([error]);
  } else {
    loginlink.click();
    removeErrors();
  }
});

loginFrom.addEventListener("submit", async (event) => {
  event.preventDefault();
  showLoginSpinner();
  //   await getUploadedFiles();
  const email = event.target[0].value;
  const password = event.target[1].value;
  const error = await handleLoginSubmit({ email, password });
  hideLoginSpinner();
  if (error) {
    handleErrors([error]);
  } else {
    removeErrors();
    logedIn();
  }
});

fileInput.addEventListener("change", async (event) => {
  event.preventDefault();
  if (fileInput.length == 0) {
    return;
  }
  const file = fileInput.files[0];
  const check = await validateFile(file);
  if (check) {
    return;
  }
  fileName.textContent = "FileName: " + minimizeFileName(file.name);
  const error = await handleFileUpload(file);
  if (error) {
    console.log(error);
    
  } else {
    console.log("Upload successfully");
  }
});

function minimizeFileName(fileName) {
  if (fileName.length > 30) {
    return fileName.substring(0, 30);
  }
  return fileName;
}

function handleErrors(errors) {
  if (errors.length > 0) {
    removeErrors();
    showError(errors);
    return false;
  }
  return true;
}
function showError(errors) {
  let errorList = document.createElement("ul");
  errorList.style.listStyleType = "none";
  errorList.className = "error-list";
  errors.forEach((error) => {
    let listItem = document.createElement("li");
    listItem.className = "error-message";
    listItem.textContent = error;
    errorList.appendChild(listItem);
  });
  errorContainer.appendChild(errorList);
}
function removeErrors() {
  errorContainer.innerHTML = "";
}
function validatePassword(password) {
  const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
  return regex.test(password);
}
export { baseUrl };
