const rowList = document.querySelector(".row-list");
const errorFile = document.querySelector("#error-message-file");
const listDownloadFiles = document.querySelector(".row-list-download-file");
const listOfAdminFiles = document.querySelector(".admin-row-list");
const listOfUsers = document.querySelector(".admin-users-list");
const upload = document.querySelector(".upload");
const download = document.querySelector(".download");
const fileTab = document.querySelector(".file");
const usersTab = document.querySelector(".users");
import { baseUrl } from "./index.js";
import { logedOut } from "./login.js";
errorFile.textContent = "";

/* 
handleFileUpload is responsible for making an API call to
upload a single file to /api/user/file endpoint. if the 
response status is 200, the file is uploaded. otherwise, 
the error message is returned. 
*/
function showDownloadFiles() {
  rowList.style.display = "";
  listDownloadFiles.style.display = "none";
  errorFile.style.display = "none";
  download.classList.remove("active-file");
  upload.classList.add("active-file");
}

function showUploadFiles() {
  rowList.style.display = "none";
  listDownloadFiles.style.display = "";
  errorFile.style.display = "";
  upload.classList.remove("active-file");
  download.classList.add("active-file");
}

function showUsers() {
  listOfAdminFiles.style.display = "none";
  listOfUsers.style.display = "";
  fileTab.classList.remove("active-admin-file");
  usersTab.classList.add("active-admin-file");
}
function showAdminFiles() {
  listOfAdminFiles.style.display = "";
  listOfUsers.style.display = "none";
  fileTab.classList.add("active-admin-file");
  usersTab.classList.remove("active-admin-file");
}
async function handleFileUpload(file, url) {
  const formData = new FormData();
  formData.append("file", file);
  try {
    const response = await fetch(baseUrl + url, {
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

/* 
getUPloadedFiles is responsible for making an API call to
/api/user/files endpoint to get a list of files uploaded 
by the user. if the response status is 200, the list of 
files is returned. otherwise, the error message is returned.
*/
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
async function getUsers() {
  try {
    const response = await fetch(baseUrl + "/api/users", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Set the Authorization header to your JWT token
      },
    });
    const data = await response.json();
    if (response.status == 200) {
      console.log(data, "users");
      handleUsers(data, listOfUsers, "/api/users");
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
/* 
handleDownloadFile is responsible for manipulating the DOM 
to show a list of files the user has uploaded and add function
that is responsible for making API call to download the file 
when the user clicks the download button. if the response status 
is 200, the file is downloaded. otherwise, the error message is returned.
*/
function handleDownloadFile(data) {
  return _handleFiles(data, rowList, "/api/user/file/");
}

/*  
validateFile is responsible for validating the file
type allowed. it accepts the file and returns true
if the file type is allowed. otherwise, it returns false.
*/
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

async function getListOfDownloadFiles() {
  try {
    const response = await fetch(baseUrl + "/api/files", {
      headers: {
        // Authorization: `Bearer ${localStorage.getItem("token")}`, // Set the Authorization header to your JWT token
      },
    });
    const data = await response.json();
    console.log(data, "download1");

    if (response.status == 200) {
      // handleDownloadFile(data);
      console.log(data);
      handleUploadFiles(data);
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
async function getListOfAdminFiles() {
  console.log("here in addmin list");
  try {
    const response = await fetch(baseUrl + "/api/admin/files", {
      headers: {
        // Authorization: `Bearer ${localStorage.getItem("token")}`, // Set the Authorization header to your JWT token
      },
    });
    const data = await response.json();

    if (response.status == 200) {
      // handleDownloadFile(data);
      console.log(data, "list of adminfiles");
      _handleAdminFiles(data, listOfAdminFiles, "/api/admin/file/");
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

function handleUploadFiles(data) {
  return _handleFiles(data, listDownloadFiles, "/api/admin/file/");
}

function _handleAdminFiles(data, list, url) {
  console.log(data, list, url);
  console.log("here in handle admin list", data);
  list.innerHTML = "";
  data.forEach(async (element) => {
    console.log(element, "element");
    const listItem = document.createElement("li");
    const div = document.createElement("div");
    const fileIcon = document.createElement("i");
    fileIcon.className = "fa-solid fa-file";
    div.id = "name";
    const span = document.createElement("span");
    const textSpan = document.createElement("span");
    textSpan.textContent =
      " " + minimizeFileName(element.path ? element.path : element);
    span.appendChild(fileIcon);
    span.appendChild(textSpan);
    div.appendChild(span);
    const downloadIcon = document.createElement("i");
    const deleteIcon = document.createElement("i");
    downloadIcon.className = "fa-solid fa-download";
    deleteIcon.className = "fas fa-trash-alt";
    const deleteDiv = document.createElement("div");
    const downloadDiv = document.createElement("div");
    downloadDiv.appendChild(downloadIcon);
    deleteDiv.appendChild(deleteIcon);
    const spinnerDiv = document.createElement("div");
    div.className = "file-spinner";
    const iconSpinner = document.createElement("div");
    spinnerDiv.appendChild(iconSpinner);
    iconSpinner.className = "file-spinner-icon";
    const iconSpan = document.createElement("span");
    iconSpan.className = "icon-span-file";
    downloadDiv.className = "download-icon";
    iconSpan.appendChild(downloadDiv);

    iconSpan.appendChild(deleteDiv);
    div.appendChild(iconSpan);
    listItem.appendChild(div);
    list.appendChild(listItem);

    downloadDiv.addEventListener("click", async (event) => {
      event.preventDefault();
      div.removeChild(iconSpan);
      div.appendChild(spinnerDiv);
      try {
        const local_url = url + (element._id ? element._id : element);
        const response1 = await fetch(baseUrl + local_url, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Set the Authorization header to your JWT token
          },
        });
        const blob = await response1.blob();

        if (response1.status == 200) {
          const url = await URL.createObjectURL(blob);
          console.log(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = element.path ? element.path : element;
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

      div.removeChild(spinnerDiv);
      div.appendChild(iconSpan);
    });
    deleteDiv.addEventListener("click", async (event) => {
      event.preventDefault();

      div.removeChild(iconSpan);
      div.appendChild(spinnerDiv);
      try {
        const local_url =
          "/api/admin/file/" + (element._id ? element._id : element);
        console.log(element, "element", local_url);
        const response2 = await fetch(baseUrl + local_url, {
          method: "delete",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Set the Authorization header to your JWT token
            "Content-Type": "application/json",
          },
        });

        if (response2.status == 200) {
          console.log("deleted successfully");
          getListOfAdminFiles();
        } else if (response2.status == 401 || response2.status == 403) {
          logedOut();
        } else {
          console.log(response2);
        }
      } catch (e) {
        alert(e.toString());
      }
      div.removeChild(spinnerDiv);
      div.appendChild(iconSpan);
    });
  });
  console.log(list);
}
function handleUsers(data, list, url) {
  list.innerHTML = "";
  data.forEach(async (element) => {
    const listItem = document.createElement("li");
    const div = document.createElement("div");
    const fileIcon = document.createElement("i");
    fileIcon.className = "fa-solid fa-user";
    // <i class="fa-solid fa-user"></i>
    div.id = "name";
    const span = document.createElement("span");
    const textSpan = document.createElement("span");
    textSpan.textContent = " " + minimizeFileName(element.username);
    span.appendChild(fileIcon);
    span.appendChild(textSpan);
    div.appendChild(span);
    // const icon = document.createElement("i");
    // icon.className = "fa-solid fa-download";
    // const downloadDiv = document.createElement("div");
    // downloadDiv.appendChild(icon);
    const spinnerDiv = document.createElement("div");
    div.className = "file-spinner";
    const iconSpinner = document.createElement("div");
    spinnerDiv.appendChild(iconSpinner);
    iconSpinner.className = "file-spinner-icon";
    // div.appendChild(downloadDiv);
    listItem.appendChild(div);
    list.appendChild(listItem);
    // downloadDiv.addEventListener("click", async (event) => {
    //   event.preventDefault();
    //   div.removeChild(downloadDiv);
    //   div.appendChild(spinnerDiv);
    //   try {
    //     const local_url = url + (element._id ? element._id : element);
    //     const response1 = await fetch(baseUrl + local_url, {
    //       headers: {
    //         Authorization: `Bearer ${localStorage.getItem("token")}`, // Set the Authorization header to your JWT token
    //       },
    //     });
    //     const blob = await response1.blob();

    //     if (response1.status == 200) {
    //       const url = await URL.createObjectURL(blob);
    //       console.log(blob);
    //       const a = document.createElement("a");
    //       a.href = url;
    //       a.download = element.path ? element.path : element;
    //       document.body.appendChild(a);
    //       a.click();
    //       a.remove();
    //     } else if (response1.status == 401 || response1.status == 403) {
    //       alert("Unauthorized");
    //       logedOut();
    //     } else {
    //       alert("Error downloading file");
    //     }
    //   } catch (e) {
    //     alert(e.toString());
    //   }
    //   div.removeChild(spinnerDiv);
    //   div.appendChild(downloadDiv);
    // });
  });
}
function _handleFiles(data, list, url) {
  list.innerHTML = "";
  data.forEach(async (element) => {
    const listItem = document.createElement("li");
    const div = document.createElement("div");
    const fileIcon = document.createElement("i");
    fileIcon.className = "fa-solid fa-file";
    div.id = "name";
    const span = document.createElement("span");
    const textSpan = document.createElement("span");
    textSpan.textContent =
      " " + minimizeFileName(element.path ? element.path : element);
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
    spinnerDiv.appendChild(iconSpinner);
    iconSpinner.className = "file-spinner-icon";
    div.appendChild(downloadDiv);
    listItem.appendChild(div);
    list.appendChild(listItem);
    downloadDiv.addEventListener("click", async (event) => {
      event.preventDefault();
      div.removeChild(downloadDiv);
      div.appendChild(spinnerDiv);
      try {
        const local_url = url + (element._id ? element._id : element);
        const response1 = await fetch(baseUrl + local_url, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Set the Authorization header to your JWT token
          },
        });
        const blob = await response1.blob();

        if (response1.status == 200) {
          const url = await URL.createObjectURL(blob);
          console.log(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = element.path ? element.path : element;
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
      div.removeChild(spinnerDiv);
      div.appendChild(downloadDiv);
    });
  });
}

/*
minimizeFileName is responsible for minimizing the
file name to 20 characters if it is more than 20 characters.
*/
function minimizeFileName(name) {
  if (name.length > 45) {
    return name.substring(0, 45) + "...";
  }
  return name;
}
export {
  handleFileUpload,
  getUploadedFiles,
  validateFile,
  getListOfDownloadFiles,
  showDownloadFiles,
  showUploadFiles,
  getListOfAdminFiles,
  showAdminFiles,
  showUsers,
  getUsers,
};
