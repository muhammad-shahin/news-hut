import Swal from "sweetalert2";

const firebaseAuthError = (errorMessage) => {
  if (errorMessage === "Firebase: Error (auth/email-already-in-use).") {
    return Swal.fire({
      title: "Failed To Create Account",
      text: "This email is already associated with an existing account. Please sign in instead.",
      icon: "error",
      confirmButtonText: "Ok",
    });
  } else if (
    errorMessage === "Firebase: Error (auth/invalid-login-credentials)."
  ) {
    return Swal.fire({
      title: "Invalid Email or Password",
      text: "No user found with this email & password. Please double-check your email address & password and try again.",
      icon: "error",
      confirmButtonText: "Ok",
    });
  } else if (errorMessage === "Firebase: Error (auth/ invalid-email).") {
    return Swal.fire({
      title: "Invalid Email Address",
      text: "The email address you entered is not in a valid format. Please double-check your email address and try again.",
      icon: "error",
      confirmButtonText: "Ok",
    });
  } else if (errorMessage === "Firebase: Error (auth/user-not-found).") {
    return Swal.fire({
      title: "Account Not Found",
      text: "We couldn't find an account with this email address. Please make sure you've entered the correct email or sign up for a new account.",
      icon: "error",
      confirmButtonText: "Ok",
    });
  } else if (errorMessage === "Firebase: Error (auth/wrong-password).") {
    return Swal.fire({
      title: "Incorrect Password",
      text: "The password you entered is incorrect. Please double-check your password and try again.",
      icon: "error",
      confirmButtonText: "Ok",
    });
  } else if (errorMessage === "Firebase: Error (auth/weak-password).") {
    return Swal.fire({
      title: "Weak Password",
      text: "Your password is too weak. It should be at least 8 characters long and include a combination of letters, numbers, and special characters.",
      icon: "error",
      confirmButtonText: "Ok",
    });
  } else if (
    errorMessage === "Firebase: Error (auth/network-request-failed)."
  ) {
    return Swal.fire({
      title: "Network Error",
      text: "There was a problem connecting to the server. Please check your internet connection and try again.",
      icon: "error",
      confirmButtonText: "Ok",
    });
  } else if (errorMessage === "Firebase: Error (auth/too-many-requests).") {
    return Swal.fire({
      title: "Too Many Requests",
      text: "You've made too many unsuccessful login attempts. Please wait a while before trying again or reset your password.",
      icon: "error",
      confirmButtonText: "Ok",
    });
  } else if (errorMessage === "Firebase: Error (auth/user-disabled).") {
    return Swal.fire({
      title: "Account Disabled",
      text: "Your account has been disabled. Please contact support for assistance.",
      icon: "error",
      confirmButtonText: "Ok",
    });
  } else {
    // Handle other error messages here, or provide a generic error message.
    return Swal.fire({
      title: "Error",
      text: "An unexpected error occurred. Please try again later.",
      icon: "error",
      confirmButtonText: "Ok",
    });
  }
};

export default firebaseAuthError;
