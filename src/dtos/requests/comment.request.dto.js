const { sanitizeInput } = require('@/helpers/sanitize');

exports.createCommentDto = (req) => {
  const resultBinding = {
    validatedData: {},
    errors: {},
  };

  if (req.content && req.content.trim() !== '') {
    resultBinding.errors.content = 'a content for your comment is required';
  } else {
    resultBinding.validatedData.content = sanitizeInput(req.content);
  }

  return resultBinding;
};
