exports.createAgencyRequestDto = (req) => {
  const bindingResult = {
    validatedData: {},
    errors: {},
  };

  if (req.body.name) {
    bindingResult.validatedData.name = req.body.name;
  } else {
    bindingResult.errors.name = 'You must provide a valid agency name';
  }

  if (req.body.contactEmail) {
    bindingResult.validatedData.contactEmail = req.body.contactEmail;
  } else {
    bindingResult.errors.contactEmail = 'You must provide a valid agency contact email';
  }
  if (req.body.contactPhone) {
    bindingResult.validatedData.contactPhone = req.body.contactPhone;
  } else {
    bindingResult.errors.price = 'You must provide a valid agency contact phone';
  }
  if (req.body.contactName) {
    bindingResult.validatedData.contactName = req.body.contactName;
  } else {
    bindingResult.errors.stock = 'You must provide agency contact person';
  }

  bindingResult.validatedData.website = req.body.website;
  bindingResult.validatedData.logoUrl = null;
  bindingResult.validatedData.isActive = true;

  return bindingResult;
};
