const { sanitizeInput } = require('@/helpers/sanitize');

exports.createUserRequestDto = (body) => {
  const resultBinding = {
    validatedData: {},
    errors: {},
  };

  // eslint-disable-next-line max-len, no-useless-escape
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!body.firstName || body.firstName.trim() === '') resultBinding.errors.firstName = 'firstName is required';
  else resultBinding.validatedData.firstName = sanitizeInput(body.firstName);

  if (!body.lastName || body.lastName.trim() === '') resultBinding.errors.lastName = 'LastName is required';
  else resultBinding.validatedData.lastName = sanitizeInput(body.lastName);

  if (!body.phone || body.phone.trim() === '') resultBinding.errors.phone = 'Phone Number is required';
  else resultBinding.validatedData.phone = sanitizeInput(body.phone);

  // eslint-disable-next-line max-len
  if (body.email && body.email.trim() !== '' && emailRegex.test(String(body.email).toLowerCase())) resultBinding.validatedData.email = sanitizeInput(body.email.toLowerCase());
  else resultBinding.errors.email = 'Email is required';

  if (body.password && body.password.trim() !== '') resultBinding.validatedData.password = body.password;
  else resultBinding.errors.password = 'Password must not be empty';

  resultBinding.validatedData.isPhoneVerified = false;
  resultBinding.validatedData.isEmailVerified = false;
  resultBinding.validatedData.isKycVerified = false;
  resultBinding.validatedData.dateOfBirth = null;
  resultBinding.validatedData.gender = null;
  resultBinding.validatedData.profilePicture = null;

  return resultBinding;
};
