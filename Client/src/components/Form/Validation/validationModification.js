const validation = (input) => {
  const errors = {};

  if (!/^.{1,20}$/.test(input.name) && input.name) {
    errors.name = "The name must contain a maximum of 20 characters";
  } else if (!/^[A-Za-z]+$/.test(input.name) && input.name) {
    errors.name = "The name must contain only letters";
  }

  if (!/^.{1,20}$/.test(input.lastName) && input.lastName) {
    errors.lastName = "The lastName must contain a maximum of 20 characters";
  } else if (!/^[A-Za-z]+$/.test(input.lastName) && input.lastName) {
    errors.lastName = "The lastName must contain only letters";
  }

  if (isNaN(parseInt(input.age)) && input.age) {
    errors.age = "Age must be a valid number";
  } else if (parseInt(input.age) < 18 && input.age) {
    errors.age = "Age must be over 18";
  } else if (parseInt(input.age) > 115 && input.age) {
    errors.age = "Age must be under 115";
  }

  if (isNaN(parseInt(input.tel)) && input.tel) {
    errors.tel = "The phone must be a valid number";
  } else if (!/^.{6,14}$/.test(input.tel) && input.tel) {
    errors.tel = "The phone must have between 6 and 14 digits.";
  }
  if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(input.email) && input.email) {
    errors.email = "Email is invalid";
  }

  if (input.password.length < 8 && input.password) {
    errors.password = "Password must contain at least 8 characters";
  } else if (!/[a-z]/.test(input.password) && input.password) {
    errors.password = "Password must contain a lowercase letter";
  } else if (!/[A-Z]/.test(input.password) && input.password) {
    errors.password = "Password must contain an uppercase letter";
  } else if (!/\d/.test(input.password) && input.password) {
    errors.password = "Password must contain a number";
  }

  if (input.confirmPassword.length < 8 && input.confirmPassword) {
    errors.confirmPassword = "Confirm Password must contain at least 8 characters";
  } else if (!/[a-z]/.test(input.confirmPassword) && input.confirmPassword) {
    errors.confirmPassword = "Confirm Password must contain a lowercase letter";
  } else if (!/[A-Z]/.test(input.confirmPassword) && input.confirmPassword) {
    errors.confirmPassword = "Confirm Password must contain an uppercase letter";
  } else if (!/\d/.test(input.confirmPassword) && input.confirmPassword) {
    errors.confirmPassword = "Confirm Password must contain a number";
  } else if (input.password !== input.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  if (!/^(https?:\/\/)?\S+\.(jpg|jpeg|png|gif|webp)$/.test(input.image) && input.image) {
    errors.image = "The image must be of type jpg, jpeg, webp, png or gif";
  }

  return errors;
};

export default validation;