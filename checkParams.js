const checkParams = (array, body, response, next)  => {
  let count = 0;
  for (let requiredParameter of array) {
    if (!body[requiredParameter]) {
      count++;
    }
  }
  if (count > 0) {
    return response.status(422).json({
      error: `You are missing the ${requiredParameter} property.`
    });
  }
  return next();

};

module.exports = checkParams;
