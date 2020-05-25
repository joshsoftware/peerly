import getDefaultHeaders from "utils/commonHeaders.js";

export default ({ path, signal, additionalHeaders }) => {
  return fetch(path, {
    method: "GET",
    referrer: "no-referrer",
    redirect: "manual",
    signal,
    headers: new Headers({
      ...getDefaultHeaders(),
      ...additionalHeaders,
    }),
  });
};
