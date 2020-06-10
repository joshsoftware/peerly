const yup = require("yup");

module.exports.insertSchema = () => {
  return yup.object().shape({
    org_id: yup
      .number()
      .typeError({ org_id: "should be number" })
      .required({ org_id: "required" }),
    text: yup.string().required({ text: "required" }),
    description: yup.string().required({ description: "required" }),
    parent_core_value_id: yup
      .number()
      .typeError({ parent_core_value_id: "should be number" }),
  });
};

module.exports.findAllSchema = () => {
  return yup.object().shape({
    org_id: yup
      .number()
      .typeError({ org_id: "should be number" })
      .required({ org_id: "required" }),
  });
};

module.exports.findOneSchema = () => {
  return yup.object().shape({
    id: yup
      .number()
      .typeError({ id: "should be number" })
      .required({ id: "required" }),
    org_id: yup
      .number()
      .typeError({ org_id: "should be number" })
      .required({ org_id: "required" }),
  });
};

module.exports.updateSchema = () => {
  return yup.object().shape({
    id: yup
      .number()
      .typeError({ id: "should be a number" })
      .required({ id: "required" }),
    org_id: yup
      .number()
      .typeError({ org_id: "should be a number" })
      .required({ org_id: "required" }),
    text: yup.string(),
    description: yup.string(),
    parent_core_value_id: yup.number().typeError({
      parent_core_value_id: "should be a number",
    }),
  });
};

module.exports.getByIdSchema = () => {
  return yup.object().shape({
    id: yup
      .number()
      .typeError({ id: "should be number" })
      .required({ id: "required" }),
  });
};
