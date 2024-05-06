exports.createProjectRequestDto = (req) => {
  const bindingResult = {
    validatedData: {},
    errors: {},
  };

  if (req.body.name) {
    bindingResult.validatedData.name = req.body.name;
  } else {
    bindingResult.errors.name = 'You must provide a valid name';
  }

  if (req.body.description) {
    bindingResult.validatedData.description = req.body.description;
  } else {
    bindingResult.errors.description = 'You must provide a valid description';
  }
  if (req.body.startDate) {
    bindingResult.validatedData.startDate = req.body.startDate;
  } else {
    bindingResult.errors.startDate = 'You must provide a start date for this project';
  }
  if (req.body.dueDate) {
    bindingResult.validatedData.dueDate = req.body.dueDate;
  } else {
    bindingResult.errors.dueDate = 'You must provide a due date for this project';
  }
  if (req.body.isFree) {
    bindingResult.validatedData.isFree = req.body.isFree;
  } else {
    bindingResult.errors.isFree = 'You must if this project has no budget';
  }

  bindingResult.validatedData.status = null;
  bindingResult.validatedData.color = null;
  bindingResult.validatedData.budget = null;
  bindingResult.validatedData.progress = null;
  bindingResult.validatedData.usedAmount = null;
  bindingResult.validatedData.isActive = true;
  bindingResult.validatedData.isDeleted = false;
  bindingResult.validatedData.createdBy = null;
  bindingResult.validatedData.agencyId = null;
  bindingResult.validatedData.visibility = null;

  return bindingResult;
};
