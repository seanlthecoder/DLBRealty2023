const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YmMxODcyYmRjODhhZmNhOWE4YzgyMSIsImlhdCI6MTY5MDA1NTAyM30.5IzB3XQouX6wWelRP1LmRiBgEZc5qtJuZs_kAB9Tzsw";
import { baseUrl } from "./index.js";
const rowList = document.querySelector(".row-list");

async function handleFileUpload(file) {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch(baseUrl + "/api/user/file", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`, // Set the Authorization header to your JWT token
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
    } else if (response.status == 401) {
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
    const response = await fetch(baseUrl + "/api/user/files", {
      headers: {
        Authorization: `Bearer ${token}`, // Set the Authorization header to your JWT token
      },
    });
    const data = await response.json();
    if (response.status == 200) {
      console.log(data);
      data.forEach((element) => {
        const listItem = document.createElement("li");
        const div = document.createElement("div");
        div.id = "name";
        div.textContent = element.path;
        const icon = document.createElement("i");
        icon.className = "fa-solid fa-download";
        div.appendChild(icon);
        listItem.appendChild(div);
        rowList.appendChild(listItem);
        icon.addEventListener("click", async (event) => {
          event.preventDefault();
          console.log(element._id);
          const response1 = await fetch(
            baseUrl + "/api/user/file/" + element._id,
            {
              headers: {
                Authorization: `Bearer ${token}`, // Set the Authorization header to your JWT token
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
            console.log(data1);
          } else {
            console.log(data1);
          }
        });
      });
      return;
    } else if (response.status == 400) {
      console.log(data);
      return data.error;
    } else if (response.status == 401) {
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
export { handleFileUpload, getUploadedFiles };
