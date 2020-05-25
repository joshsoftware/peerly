import objToQueryString from "utils/objToQueryString.js";
import getDefaultHeaders from "utils/commonHeaders.js";

export default ({
  path,
  paramsObj = {},
  apiToken,
  signal,
  additionalHeaders,
}) => {
  const queryString = objToQueryString(paramsObj);

  return fetch(`${path}${queryString}`, {
    method: "GET",
    referrer: "no-referrer",
    redirect: "manual",
    signal,
    headers: new Headers({
      ...getDefaultHeaders(apiToken),
      ...additionalHeaders,
    }),
  });
};
