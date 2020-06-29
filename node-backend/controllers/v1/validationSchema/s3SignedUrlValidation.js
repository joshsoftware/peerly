const yup = require("yup");

module.exports.s3SignedUrl = () => {
  return yup.object().shape({
    type: yup.string().required({ type: "required" }),
  });
};
