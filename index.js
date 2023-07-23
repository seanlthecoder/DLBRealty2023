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
} from "./login.js";
import { handleFileUpload, getUploadedFiles } from "./file.js";
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
// loginSection.style.display = 'none';
// formBox.style.display = "none";
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
  await getUploadedFiles();
  const email = event.target[0].value;
  const password = event.target[1].value;
  const error = await handleLoginSubmit({ email, password });
  hideLoginSpinner();
  if (error) {
    handleErrors([error]);
  } else {
    console.log("Login successfully");
    removeErrors();
  }
});

fileInput.addEventListener("change", async (event) => {
  event.preventDefault();
  if (fileInput.length == 0) {
    return;
  }
  const file = fileInput.files[0];

  console.log(file.name);
  console.log(validateFile(file));
  fileName.textContent = "FileName: " + minimizeFileName(file.name);
  console.log(file);
  const error = await handleFileUpload(file);
  console.log("file upload");
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
function validateFile(file) {
  const reader = new FileReader();
  reader.onloadend = function () {
    const arr = new Uint8Array(reader.result).subarray(0, 4);
    let header = "";
    for (let i = 0; i < arr.length; i++) {
      header += arr[i].toString(16);
    }
    let type;
    switch (header) {
      case "25504446":
        type = "application/pdf";
        break;
      case "504b0304":
        type =
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
        break;
      case "d0cf11e0":
        type = "application/msword";
        break;
      default:
        type = "";
        break;
    }
    if (type) {
      console.log(type);
      return;
    } else {
      alert("Invalid file type");
      return "Invalid file type";
    }
  };
  reader.readAsArrayBuffer(file);
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

export { baseUrl };
