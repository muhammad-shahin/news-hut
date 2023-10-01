import Swal from "sweetalert2";

const firebaseStorageError = (errorMessage) => {
  if (errorMessage === "Firebase: Error (storage/object-not-found)") {
    return Swal.fire({
      title: "Object Not Found",
      text: "The requested object does not exist at the desired reference.",
      icon: "error",
      confirmButtonText: "Ok",
    });
  } else if (errorMessage === "Firebase: Error (storage/quota-exceeded)") {
    return Swal.fire({
      title: "Quota Exceeded",
      text: "The quota for your Cloud Storage bucket has been exceeded. Please upgrade or contact support.",
      icon: "error",
      confirmButtonText: "Ok",
    });
  } else if (errorMessage === "Firebase: Error (storage/unauthenticated)") {
    return Swal.fire({
      title: "Unauthenticated",
      text: "You are not authenticated. Please log in and try again.",
      icon: "error",
      confirmButtonText: "Ok",
    });
  } else if (errorMessage === "Firebase: Error (storage/unauthorized)") {
    return Swal.fire({
      title: "Unauthorized",
      text: "You are not authorized to perform this action. Check permissions and try again.",
      icon: "error",
      confirmButtonText: "Ok",
    });
  } else if (
    errorMessage === "Firebase: Error (storage/retry-limit-exceeded)"
  ) {
    return Swal.fire({
      title: "Retry Limit Exceeded",
      text: "Maximum time limit exceeded. Please try the operation again.",
      icon: "error",
      confirmButtonText: "Ok",
    });
  } else if (errorMessage === "Firebase: Error (storage/invalid-checksum)") {
    return Swal.fire({
      title: "Invalid Checksum",
      text: "Checksum mismatch. Try uploading again.",
      icon: "error",
      confirmButtonText: "Ok",
    });
  } else if (errorMessage === "Firebase: Error (storage/canceled)") {
    return Swal.fire({
      title: "Operation Canceled",
      text: "The operation was canceled by the user.",
      icon: "info",
      confirmButtonText: "Ok",
    });
  } else if (errorMessage === "Firebase: Error (storage/invalid-url)") {
    return Swal.fire({
      title: "Invalid URL",
      text: "Invalid URL format. Please check the URL.",
      icon: "error",
      confirmButtonText: "Ok",
    });
  } else {
    // Handle other error messages here or provide a generic error message.
    return Swal.fire({
      title: "Error",
      text: "An unexpected error occurred. Please try again later.",
      icon: "error",
      confirmButtonText: "Ok",
    });
  }
};

export default firebaseStorageError;
