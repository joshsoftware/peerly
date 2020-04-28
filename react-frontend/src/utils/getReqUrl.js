import config from "config.js";

export default (reqPath) => {
  return `${config.apiBaseUrl}${reqPath}`;
};
