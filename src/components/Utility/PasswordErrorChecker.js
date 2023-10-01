// handlePasswordChange
const passwordErrorChecker = (e) => {
  const password = e.target.value;
  if (password.length < 1) {
    return "";
  } else if (password.length < 6) {
    return "Password must be more than 6 characters";
  } else if (!/[A-Z]/.test(password)) {
    return "Password must contain at least 1 Uppercase characters";
  } else if (!/[a-z]/.test(password)) {
    return "Password must contain at least 1 Lowercase characters";
  } else if (!/\d/.test(password)) {
    return "Password must contain at least 1 number characters";
  } else if (!/[@$!%*?&#]/.test(password)) {
    return "Password must contain at least 1 special characters";
  } else {
    return "";
  }
};

export default passwordErrorChecker;
