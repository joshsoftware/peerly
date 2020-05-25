//import getRequestUrl from "utils/getReqUrl.js";
import getDefaultHeaders from "utils/commonHeaders.js";

export default ({
  path,
  paramsObj = {},
  apiToken,
  //signal,
  additionalHeaders,
  method = "POST",
}) => {
  return fetch(path, {
    method,
    referrer: "no-referrer",
    redirect: "manual",
    // signal,
    headers: new Headers({
      ...getDefaultHeaders(apiToken),
      ...additionalHeaders,
    }),
    body: paramsObj instanceof FormData ? paramsObj : JSON.stringify(paramsObj),
  });
};
