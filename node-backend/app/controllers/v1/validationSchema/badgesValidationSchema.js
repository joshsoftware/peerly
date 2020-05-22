const yup = require("yup");

module.exports.insertSchema = () => {
  return yup.object().shape({
    org_id: yup
      .number()
      .required({ org_id: "required" })
      .typeError({ org_id: "should be a number" }),
    name: yup.string().required({ name: "required" }),
    hi5_count_required: yup
      .number()
      .typeError({ hi5_count_required: "should be a number" })
      .required({ hi5_count_required: "required" }),
    hi5_frequency: yup.string().required({ hi5_frequency: "required" }),
  });
};

module.exports.findAllSchema = () => {
  return yup.object().shape({
    org_id: yup
      .number()
      .typeError({ org_id: "should be a number" })
      .required({ org_id: "required" }),
  });
};

module.exports.findOneSchema = () => {
  return yup.object().shape({
    id: yup
      .number()
      .required({ id: "required" })
      .typeError({ id: "should be a number" }),
    org_id: yup
      .number()
      .typeError({ org_id: "should be a number" })
      .required({ org_id: "required" }),
  });
};

module.exports.updateSchema = () => {
  return yup.object().shape({
    id: yup
      .number()
      .required({ id: "required" })
      .typeError({ id: "should be a number" }),
    org_id: yup
      .number()
      .typeError({ org_id: "should be a number" })
      .required({ org_id: "required" }),
    name: yup.string(),
    hi5_frequency: yup.string(),
    hi5_count_required: yup.number().typeError({
      hi5_count_required: "Should be a number",
    }),
  });
};
