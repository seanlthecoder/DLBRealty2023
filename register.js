const spinner = document.querySelector("#spinner");
import { baseUrl } from "./index.js";
/*
handleRegisterSubmit is responsible for making an API 
call for registering the user with email, username, 
and password. if the response status is 200, the user 
is registered. otherwise, the error message is returned.
*/
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
/* 
validateUsername is responsible for validating the username
*/

function validateUsername(username) {
  const regex = /^[a-zA-Z0-9_]{3,16}$/;
  return regex.test(username);
}
/* 
showRegSpinner and hideRegSpinner are responsible for 
showing and hiding the spinner respectively when the 
user clicks the register button. shows spinner until 
the response is received from the backend server.
*/
function showRegSpinner() {
  spinner.style.display = "block";
}

function hideRegSpinner() {
  spinner.style.display = "none";
}

export {
  handleRegisterSubmit,
  validateUsername,
  showRegSpinner,
  hideRegSpinner,
};
