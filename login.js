import { baseUrl } from "./index.js";
import { getUploadedFiles } from "./file.js";
const formBox = document.querySelector(".form-box");
const fileInput = document.querySelector("#file-href");
const logoutBtn = document.querySelector("#logout");
const rowList = document.querySelector("#files");
const background = document.querySelector(".background");
const hi = document.querySelector("#hi");
const username = document.querySelector("#username");
const dlb = document.querySelector("#DLB");
const welcome = document.querySelector("#welcome");
const description = document.querySelector("#description");
const socialIcon = document.querySelector(".social-icon");

async function handleLoginSubmit(body) {
  // Make an API call to the register endpoint.
  try {
    const response = await fetch(baseUrl + "/api/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    if (response.status == 200) {
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

async function getUserProfile() {
  try {
    const response = await fetch(baseUrl + "/api/user/profile", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Set the Authorization header to your JWT token
      },
    });
    const data = await response.json();
    if (response.status == 200) {
      return data;
    } else if (response.status == 400) {
      return data.error;
    } else if (response.status == 401 || response1.status == 403) {
      logedOut();
      return data.error;
    }
  } catch (error) {
    return error.toString();
  }
}

async function logedIn() {
  getUserProfile()
    .then((user) => {
      username.textContent = user.username;
    })
    .catch((error) => {
      console.log(error);
    });
  hi.style.display = "block";
  username.style.display = "block";
  dlb.style.display = "none";
  welcome.style.display = "none";
  description.style.display = "none";
  socialIcon.style.display = "none";
  formBox.style.display = "none";
  fileInput.style.display = "inline";
  logoutBtn.style.display = "inline";
  rowList.style.display = "block";
  background.style.background = "url(./images/chicagoHD.jpg) no-repeat ";
  background.style.backgroundSize = "cover";
  background.style.backgroundPosition = "center";
  getUploadedFiles();
}

function logedOut() {
  localStorage.removeItem("token");
  hi.style.display = "none";
  username.style.display = "none";
  dlb.style.display = "block";
  welcome.style.display = "block";
  description.style.display = "block";
  socialIcon.style.display = "block";
  formBox.style.display = "";
  fileInput.style.display = "none";
  logoutBtn.style.display = "none";
  rowList.style.display = "none";
  background.style.background = "url(./images/chicago2.jpg) no-repeat ";
  background.style.backgroundSize = "cover";
  background.style.backgroundPosition = "center";
}

export {
  handleLoginSubmit,
  showLoginSpinner,
  hideLoginSpinner,
  logedIn,
  logedOut,
};
