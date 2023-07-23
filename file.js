const rowList = document.querySelector(".row-list");
import { baseUrl } from "./index.js";
import { logedOut } from "./login.js";
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
      console.log("File uploaded successfully");
      console.log(data);
      return;
    } else if (response.status == 400) {
      console.log(data);
      return data.error;
    } else if (response.status == 401 || response1.status == 403) {
      console.log(data);
      return data.error;
    }
    await getUploadedFiles();
  } catch (error) {
    console.error(error);
  }
}
async function getUploadedFiles() {
  try {
    console.log();
    const response = await fetch(baseUrl + "/api/user/files", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Set the Authorization header to your JWT token
      },
    });
    const data = await response.json();
    if (response.status == 200) {
      console.log(data);
      handleDownloadFile(data);
      return;
    } else if (response.status == 400) {
      console.log(data);
      return data.error;
    } else if (response.status == 401 || response1.status == 403) {
      console.log(data);
      return data.error;
    } else {
      console.log(data);
      return data.error;
    }
  } catch (error) {
    console.error(error);
  }
}

function handleDownloadFile(data) {
  data.forEach((element) => {
    const listItem = document.createElement("li");
    const div = document.createElement("div");
    const fileIcon = document.createElement("i");
    fileIcon.className = "fa-solid fa-file";
    div.id = "name";
    const span = document.createElement("span");
    const textSpan = document.createElement("span");
    textSpan.textContent = " " + element.path;
    span.appendChild(fileIcon);
    span.appendChild(textSpan);
    div.appendChild(span);
    const icon = document.createElement("i");
    icon.className = "fa-solid fa-download";
    div.appendChild(icon);
    listItem.appendChild(div);
    rowList.appendChild(listItem);
    icon.addEventListener("click", async (event) => {
      event.preventDefault();
      console.log(element._id);
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
          console.log(blob);
        } else if (response1.status == 401 || response1.status == 403) {
          alert("Unauthorized");
          logedOut();
          console.log(blob);
        } else {
          alert("Error downloading file");
          console.log(blob);
        }
      } catch (e) {}
    });
  });
}
export { handleFileUpload, getUploadedFiles };
