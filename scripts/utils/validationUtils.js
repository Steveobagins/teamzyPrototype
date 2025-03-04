// scripts/utils/validationUtils.js

export function isRequired(value) {
  return value != null && value.trim() !== '';
}

export function isValidEmail(email) {
  // Basic email format validation (can be improved with a more robust regex)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function minLength(value, min) {
  return value.length >= min;
}

export function maxLength(value, max) {
  return value.length <= max;
}

export function passwordsMatch(password, confirmPassword) {
  return password === confirmPassword;
}

// End of code