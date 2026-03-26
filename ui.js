import { GetCurrentUser, SetCurrentUser } from "./domain.js";

console.log("running js");

const renderLoginForm = () => {
  const formElement = document.createElement("form");
  const nameLabelElement = document.createElement("label");
  const nameInputElement = document.createElement("input");
  const breakElement = document.createElement("br");
  const submitElement = document.createElement("button");

  nameLabelElement.textContent = "Name";
  submitElement.textContent = "Submit";
  nameLabelElement.append(nameInputElement);
  formElement.replaceChildren(nameLabelElement, breakElement, submitElement);

  formElement.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log(nameInputElement.value);
    SetCurrentUser(nameInputElement.value);
    renderWholePage();
  });

  const containerElement = document.getElementById("pageContentContainer");
  containerElement.replaceChildren(formElement);
};

const renderAuthenticatedPage = () => {
const containerElement = document.getElementById("pageContentContainer");
containerElement.replaceChildren();
containerElement.textContent = "something else";

const logoutButtonElement = document.createElement("button");
logoutButtonElement.textContent = "Log Out"
containerElement.append(logoutButtonElement);

logoutButtonElement.addEventListener("click", () => {
    SetCurrentUser("");
    renderWholePage();
})
}

const renderWholePage = () => {
    const user = GetCurrentUser();
    if(!user) {
        renderLoginForm();
    }else{
        renderAuthenticatedPage();
    }
}

renderWholePage();

