import { baseUrl } from "./index.js";

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

export { handleLoginSubmit, showLoginSpinner, hideLoginSpinner };
