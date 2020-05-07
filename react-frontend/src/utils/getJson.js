import objToQueryString from "utils/objToQueryString.js";
import getRequestUrl from "utils/getReqUrl.js";
import getDefaultHeaders from "utils/commonHeaders.js";

export default ({
  path,
  paramsObj = {},
  apiToken,
  signal,
  additionalHeaders,
}) => {
  const queryString = objToQueryString(paramsObj);

  return fetch(`${getRequestUrl(path)}${queryString}`, {
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
