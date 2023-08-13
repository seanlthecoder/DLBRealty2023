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

import { showDownloadFiles, showUploadFiles } from "./file.js";
import { handleFileUpload, validateFile } from "./file.js";
const loginsec = document.querySelector(".login-section");
const loginlink = document.querySelector(".login-link");
const registerlink = document.querySelector(".register-link");
const registerFrom = document.querySelector("#register-form");
const loginFrom = document.querySelector("#login-form");
const errorContainer = document.querySelector("#register-errors");
const download = document.querySelector(".download");
const upload = document.querySelector(".upload");
// const baseUrl = "https://dlbrealty2023.onrender.com";
const baseUrl = "http://localhost:4000";
const formBox = document.querySelector(".form-box");
const fileInput = document.querySelector("#file-input");
const fileName = document.querySelector("#file-name");
const logoutBtn = document.querySelector("#logout");
const allowedFiles = [".pdf", ".docx", ".doc", ".txt", ".xls"];
fileInput.setAttribute("accept", allowedFiles.join(", "));
formBox.style.display = "none";

/* 
this code block is responsible for checking 
if the user is logged in or not. if there is
a token in the local storage, the user is logged
in. otherwise, the user is logged out.
*/
if (localStorage.getItem("token")) {
  logedIn();
  showDownloadFiles();
} else {
  logedOut();
}
download.addEventListener("click", () => {
  showDownloadFiles();
});

upload.addEventListener("click", () => {
  showUploadFiles();
});
logoutBtn.addEventListener("click", () => logedOut());
registerlink.addEventListener("click", () => {
  loginsec.classList.add("active");
});
loginlink.addEventListener("click", () => {
  removeErrors();
  loginsec.classList.remove("active");
});

/* 
this code block is responsible for adding eventlistener 
for register form , validate the input and handle the
register submit and show the spinner until the response
is received from the backend server. if there is an error,
the error message is displayed. otherwise, the user is 
redirected to the login page.
*/
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

/* 
this code block is responsible for adding eventlistener 
to login form, show the spinner until the response is 
received from the backend server. if there is an error, 
the error message is displayed. otherwise, the logdedIn 
function will be called.

*/
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
/*
this code block is responsible for adding eventlistener
for uploading file, show the file name and validate the 
file. if there is an error, the error message is displayed.
otherwise, the file will be uploaded.
*/
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

/* 
minimize the file name to 20 characters if the file name is more than 20 characters.
*/
function minimizeFileName(fileName) {
  if (fileName.length > 20) {
    return fileName.substring(0, 20);
  }
  return fileName;
}
/* 
this function is responsible for handling the errors  .
*/
function handleErrors(errors) {
  if (errors.length > 0) {
    removeErrors();
    showError(errors);
    return false;
  }
  return true;
}

/*
this function is responsible for showing the error message in the dom.
*/
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
/*
 removeErrors is responsible for removing the error message from the dom.
*/
function removeErrors() {
  errorContainer.innerHTML = "";
}

/* 
validatePassword is responsible for validating the password. 
the regex will allow password that is 8 characters long and 
contain at least one uppercase letter, one lowercase letter, 
and one digit.
*/
function validatePassword(password) {
  const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  return regex.test(password);
}
export { baseUrl };
