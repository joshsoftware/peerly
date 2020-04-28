module.exports.getFormattedErrorObj = (
  errorCode,
  errorMessage,
  errorObject
) => {
  const keys = errorObject.map((i) => Object.keys(i));
  const values = errorObject.map((i) => Object.values(i));
  let fields = {};
  let index;
  for (index = 0; index < keys.length; index++) {
    fields[keys[index][0]] = values[index][0];
  }
  const result = { code: errorCode, message: errorMessage, fields };
  return result;
};
