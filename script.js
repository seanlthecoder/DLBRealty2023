const errorContainer = document.querySelector("#register-errors");

const baseUrl = "http://localhost:4000";
// const regErrors = new Set();

async function handleRegisterSubmit(body) {
  // Make an API call to the register endpoint.
  try {
    const response = await fetch(baseUrl + "/api/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    if (response.status == 200) {
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
function validateUsername(username) {
  const regex = /^[a-zA-Z0-9_]{3,16}$/;
  return regex.test(username);
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
    errors.forEach((error) => {
      let listItem = document.createElement("li");
      listItem.textContent = error;
      errorList.appendChild(listItem);
    });
    errorContainer.appendChild(errorList);
  }
  function removeErrors() {
    errorContainer.innerHTML = "";
  }
export { handleRegisterSubmit , validateUsername, handleErrors };
