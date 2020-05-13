export default (apiToken, apiVersion = 1) => {
  return {
    "Content-Type": "application/json",
    Accept: `version=${apiVersion}`,
    Authorization: `Bearer ${apiToken}`,
  };
};
