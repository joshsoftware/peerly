import qs from "qs";

export default (payload) => {
  const options = {
    encode: true,
    arrayFormat: "brackets",
    addQueryPrefix: true,
  };

  return qs.stringify(payload, options);
};
