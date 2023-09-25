export default function validate(input) {
  let errors = {};

  // email
  if (!input.email.trim()) {
    errors.email = "Put your e-mail";
  } else if (!input.email.includes("@")) {
    errors.email = 'The e-mail must contain "@"';
  } else {
    errors.email = "";
  }
  // password
  if (!input.password.trim()) {
    errors.password = "Put your password";
  } else if (input.password.length < 8 || input.password.length > 20) {
    errors.password = "Password must be between 8 and 20 characters";
  } else if (!/\d/.test(input.password)) {
    errors.password = "Password must have at least one number";
  } else if (!/[a-zA-Z]/.test(input.password)) {
    errors.password = "Password must have at least one letter";
  } else if (!/[A-Z]/.test(input.password)) {
    errors.password = "Password must have at least one uppercase letter";
  } else {
    errors.password = "";
  }

  return errors;
}
