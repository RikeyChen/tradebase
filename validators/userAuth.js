import Validator from 'validator';
import validText from './validText';

export const validateRegisterInput = data => {
  let errors = {};

  // We do this because Validator only validates strings - ie. any other data type errors
  data.username = validText(data.username) ? data.username : '';
  data.email = validText(data.email) ? data.email : '';
  data.password = validText(data.password) ? data.password : '';
  data.confirmPassword = validText(data.confirmPassword) ? data.confirmPassword : '';

  if (!Validator.isLength(data.username, { min: 2, max: 20 })) {
    errors.username = 'Username must be between 2 and 20 characters';
  }

  if (Validator.isEmpty(data.username)) {
    errors.username = 'Username field is required';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  if (!Validator.isLength(data.password, { min: 8, max: 30 })) {
    errors.password = 'Password must be at least 8 characters'
  }

  if (Validator.isEmpty(data.confirmPassword)) {
    errors.confirmPassword = 'Confirm Password field is required';
  }

  if (!Validator.equals(data.password, data.confirmPassword)) {
    errors.confirmPassword = 'Passwords must match';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  }
};

export const validateLoginInput = data => {
  let errors = {};

  data.username = validText(data.username) ? data.username : '';
  data.password = validText(data.password) ? data.password : '';

  if (!Validator.isAlphanumeric(data.username)) {
    errors.username = 'Username should only contain letters and numbers';
  }

  if (Validator.isEmpty(data.username)) {
    errors.username = 'Username field is required';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  }
};