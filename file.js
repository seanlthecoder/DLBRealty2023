const rowList = document.querySelector(".row-list");
const errorFile = document.querySelector("#error-message-file");

import { baseUrl } from "./index.js";
import { logedOut } from "./login.js";

errorFile.textContent = "";
async function handleFileUpload(file) {
  const formData = new FormData();
  formData.append("file", file);
  try {
    const response = await fetch(baseUrl + "/api/user/file", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Set the Authorization header to your JWT token
      },
      body: formData,
    });
    const data = await response.json();
    if (response.status == 200) {
      console.log(data);
      //   return;
    } else if (response.status == 400) {
      return data.error;
    } else if (response.status == 401 || response1.status == 403) {
      return data.error;
    }
    await getUploadedFiles();
  } catch (e) {}
}

async function getUploadedFiles() {
  try {
    const response = await fetch(baseUrl + "/api/user/files", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Set the Authorization header to your JWT token
      },
    });
    const data = await response.json();
    if (response.status == 200) {
      handleDownloadFile(data);
      return;
    } else if (response.status == 400) {
      return data.error;
    } else if (response.status == 401 || response1.status == 403) {
      return data.error;
    } else {
      return data.error;
    }
  } catch (error) {
    errorFile.textContent = error.toString();
  }
}

function handleDownloadFile(data) {
  console.log("here in div constructor");
  console.log(data);
  rowList.innerHTML = "";
  data.forEach(async (element) => {
    const listItem = document.createElement("li");
    const div = document.createElement("div");
    const fileIcon = document.createElement("i");
    fileIcon.className = "fa-solid fa-file";
    div.id = "name";
    const span = document.createElement("span");
    const textSpan = document.createElement("span");
    textSpan.textContent = " " + minimizeFileName(element.path);
    span.appendChild(fileIcon);
    span.appendChild(textSpan);
    div.appendChild(span);
    const icon = document.createElement("i");
    icon.className = "fa-solid fa-download";
    const downloadDiv = document.createElement("div");
    downloadDiv.appendChild(icon);
    const spinnerDiv = document.createElement("div");
    div.className = "file-spinner";
    const iconSpinner = document.createElement("div");
    // iconSpinner.textContent = "L";
    spinnerDiv.appendChild(iconSpinner);
    iconSpinner.className = "file-spinner-icon";
    // downloadDiv.appendChild(iconSpinner);
    spinnerDiv.style.display = "none";
    div.appendChild(downloadDiv);
    listItem.appendChild(div);
    rowList.appendChild(listItem);
    downloadDiv.addEventListener("click", async (event) => {
      event.preventDefault();
      //   div.removeChild(downloadDiv);
      downloadDiv.style.display = "none";
      //   div.appendChild(spinnerDiv);
      spinnerDiv.style.display = "";
      try {
        const response1 = await fetch(
          baseUrl + "/api/user/file/" + element._id,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Set the Authorization header to your JWT token
            },
          }
        );
        const blob = await response1.blob();

        if (response1.status == 200) {
          const url = await URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = element.path;
          document.body.appendChild(a);
          a.click();
          a.remove();
        } else if (response1.status == 401 || response1.status == 403) {
          alert("Unauthorized");
          logedOut();
        } else {
          alert("Error downloading file");
        }
      } catch (e) {
        alert(e.toString());
      }
      //   div.removeChild(spinnerDiv);
      spinnerDiv.style.display = "none";
      //   div.appendChild(downloadDiv);
      downloadDiv.style.display = "";
    });
  });
}

async function validateFile(file) {
  const allowedHeaders = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.ms-excel",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];
  return !allowedHeaders.includes(file.type);
}
function minimizeFileName(name) {
  if (name.length > 50) {
    return name.substring(0, 50) + "...";
  }
  return name;
}
export { handleFileUpload, getUploadedFiles, validateFile };
