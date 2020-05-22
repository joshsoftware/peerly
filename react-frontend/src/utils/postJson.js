//import getRequestUrl from "utils/getReqUrl.js";
//import getDefaultHeaders from "utils/commonHeaders.js";

export default (paramsObj = {}) => {
  return fetch("http://localhost:3120/oauth/google", {
    method: "POST",
    referrer: "no-referrer",
    redirect: "manual",
    //  signal,
    /* headers: new Headers({
       ...getDefaultHeaders(apiToken),
       ...additionalHeaders,
     }),*/
    body: paramsObj instanceof FormData ? paramsObj : JSON.stringify(paramsObj),
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  });
};
