export default function parseErrorCode(errorCode) {
  // console.log("errorCode: ", errorCode);

  const errorCatalogue = {
    "auth/user-not-found": "Invalid Email / Password",
    "auth/wrong-password": "Invalid Email / Password",
    "auth/too-many-requests": "Request blocked, try again after sometime",
  };

  let errorMessage = "Something went wrong!";
  if (errorCatalogue[errorCode]) {
    errorMessage = errorCatalogue[errorCode];
  }
  return errorMessage;
}
