const yup = require("yup");

module.exports.s3SignedUrl = () => {
  return yup.object().shape({
    type: yup.string().required({ type: "required" }),
  });
};

module.exports.profileFileType = () => {
  return yup.object().shape({
    file_type: yup.string().required({ file_type: "required" }),
  });
};

module.exports.coreValueFileType = () => {
  return yup.object().shape({
    file_type: yup.string().required({ file_type: "required" }),
    core_value_id: yup
      .number()
      .typeError({ core_value_id: "should be number" })
      .required({ core_value_id: "required" }),
  });
};
