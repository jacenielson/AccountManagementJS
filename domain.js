var currentUser = "";

export const SetCurrentUser = (newUsername) => {
  if (currentUser !== "" && newUsername !== "") {
    console.log("cannot change user if already signed in");
    return false;
  }
  currentUser = newUsername;
  return true;
};

export const GetCurrentUser = () => {
  return currentUser;
};
