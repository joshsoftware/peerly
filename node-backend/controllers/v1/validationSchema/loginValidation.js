const yup = require("yup");

module.exports.loginUser = () => {
  return yup.object().shape({
    token: yup.string().required({ token: "required" }),
  });
};
