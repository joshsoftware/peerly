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
/*eslint-disable no-useless-escape*/
module.exports.getVersionedController = (headers, route) => {
  let version = headers.accept.split(/\.(?=[^\.]+$)/)[1];
  switch (version) {
    case "v1":
      return route.concat("V1");
    default:
      return route.concat("V1");
  }
};
/*eslint-enable no-useless-escape*/
