const validationProductsUpdate = (input) => {
  const errors = {};

  if (!/^.{1,20}$/.test(input.name) && input.name) {
    errors.name = "The name must contain a maximum of 20 characters";
  }
  // else if (!/^[A-Za-z]+$/.test(input.name) && input.name) {
  //   errors.name = "The name must contain only letters";
  // }

  if (!/^.{1,20}$/.test(input.brand) && input.brand) {
    errors.brand = "The brand must contain a maximum of 20 characters";
  } else if (!/^[A-Za-z]+$/.test(input.brand) && input.brand) {
    errors.brand = "The brand must contain only letters";
  }

  if (isNaN(parseInt(input.model)) && input.model) {
    errors.model = "Model must be a valid number";
  } else if (parseInt(input.model) > 2023 && input.model) {
    errors.model = "model must be under 2023";
  }

  if (isNaN(parseInt(input.price)) && input.price) {
    errors.price = "The price must be a valid number";
  }



  // else if (!/^.{4,12}$/.test(input.price) && input.price) {
  //   errors.price = "The number must have between 6 and 12 digits.";
  // }

  if (!/^.{1,20}$/.test(input.color) && input.color) {
    errors.color = "The color must contain a maximum of 20 characters";
  } else if (!/^[A-Za-z]+$/.test(input.color) && input.color) {
    errors.color = "The color must contain only letters";
  }

  if (!/^.{1,400}$/.test(input.description) && input.description) {
    errors.description = "The description must contain a maximum of 400 characters";
  }
  // else if (!/^[A-Za-z]+$/.test(input.description) && input.description) {
  //   errors.description = "The description must contain only letters";
  // }

  return errors;
};

export default validationProductsUpdate;