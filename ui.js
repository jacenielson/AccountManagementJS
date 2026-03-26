import { GetCurrentUser, SetCurrentUser } from "./domain.js";

console.log("running js");

const setUserInQueryString = () => {
  const user = GetCurrentUser();
  const url = new URL(window.location);
  url.searchParams.set("name", user);
  history.pushState(null, "", url);
};

const loginUserFromQueryString = () => {
    const url = new URL(window.location);
    const currentUser = url.searchParams.get("name") ?? "";
    SetCurrentUser(currentUser);
}

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
    setUserInQueryString();
    renderWholePage();
  });

  const containerElement = document.getElementById("pageContentContainer");
  containerElement.replaceChildren(formElement);
};

const renderAuthenticatedPage = () => {
  const username = GetCurrentUser();
  const containerElement = document.getElementById("pageContentContainer");
  containerElement.replaceChildren();
  containerElement.textContent = `hello ${username}`;

  const brElement = document.createElement("br");

  const logoutButtonElement = document.createElement("button");
  logoutButtonElement.textContent = "Log Out";
  containerElement.append(brElement, logoutButtonElement);

  logoutButtonElement.addEventListener("click", () => {
    SetCurrentUser("");
    setUserInQueryString();
    renderWholePage();
  });
};

const renderWholePage = () => {
  const user = GetCurrentUser();
  if (!user) {
    renderLoginForm();
  } else {
    renderAuthenticatedPage();
  }
};

loginUserFromQueryString();
renderWholePage();
