import { baseUrl } from "./index.js";
import { getUploadedFiles } from "./file.js";
const formBox = document.querySelector(".form-box");
const fileInput = document.querySelector("#file-href");
const logoutBtn = document.querySelector("#logout");
const rowList = document.querySelector("#files");

async function handleLoginSubmit(body) {
  // Make an API call to the register endpoint.
  console.log(body);
  try {
    const response = await fetch(baseUrl + "/api/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    if (response.status == 200) {
      console.log(data);
      localStorage.setItem("token", data.token);
      return;
    } else if (response.status == 400) {
      return data.error;
    } else {
      return data.error;
    }
  } catch (e) {
    return e.toString();
  }
}
const spinner = document.querySelector("#login-spinner");
function showLoginSpinner() {
  spinner.style.display = "block";
}

function hideLoginSpinner() {
  spinner.style.display = "none";
}

function logedIn() {
  console.log(localStorage.getItem("token"));
  formBox.style.display = "none";
  fileInput.style.display = "inline";
  logoutBtn.style.display = "inline";
  rowList.style.display = "block";
  getUploadedFiles();
}

function logedOut() {
  localStorage.removeItem("token");
  formBox.style.display = "";
  fileInput.style.display = "none";
  logoutBtn.style.display = "none";
  rowList.style.display = "none";
}

export {
  handleLoginSubmit,
  showLoginSpinner,
  hideLoginSpinner,
  logedIn,
  logedOut,
};
