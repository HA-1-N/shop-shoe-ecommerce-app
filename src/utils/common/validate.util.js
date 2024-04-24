export const validateEmailFormat = (value) => {
  // Regular expression for email validation
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (emailRegex.test(value)) {
    return true; // Email format is valid
  }
  return "Invalid email format.";
};

export const validatePasswordMatch = (value, allValues) => {
  const { password } = allValues;
  if (value === password) {
    return true;
  }
  return "Passwords do not match.";
};

export const validatePhoneNumber = (value) => {
  // Regular expression for phone number validation
  const phoneRegex = /^[0-9]{10,11}$/; // Accept 10 or 11 digits

  if (phoneRegex.test(value)) {
    return true; // Phone number format is valid
  }

  return "Invalid phone number format.";
};
