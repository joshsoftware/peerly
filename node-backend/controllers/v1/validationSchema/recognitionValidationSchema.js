const yup = require("yup");

module.exports.insertSchema = () => {
  return yup.object().shape({
    core_value_id: yup
      .number({ core_value_id: "should be number" })
      .required({ core_value_id: "required" })
      .typeError({ core_value_id: "should be number" }),
    text: yup.string({ text: "should be text" }).required({ text: "required" }),
    given_for: yup
      .number()
      .required({ given_for: "required" })
      .typeError({ given_for: "should be number" }),
    given_by: yup.number().typeError({ given_by: "should be number" }),
    given_at: yup.number().typeError({ given_at: "should be number" }),
  });
};

module.exports.getByIdSchema = () => {
  return yup.object().shape({
    id: yup
      .number()
      .required({ id: "required" })
      .typeError({ id: "should be number " }),
  });
};

module.exports.getFilterSchema = () => {
  return yup.object().shape({
    core_value_id: yup.array().typeError({ core_value_id: "should be array" }),
    given_for: yup.array().typeError({ given_for: "should be array" }),
    given_by: yup.array().typeError({ given_by: "should be array" }),
    limit: yup
      .number()
      .nullable()
      .typeError({ given_limit: "should be number" }),
    offset: yup
      .number()
      .nullable()
      .typeError({ given_offset: "should be number" }),
  });
};

module.exports.insertHi5Schema = () => {
  return yup.object().shape({
    recognition_id: yup
      .number()
      .required({ recognition_id: "required" })
      .typeError({ recognition_id: "should be number " }),
    given_by: yup
      .number()
      .required({ given_by: "required" })
      .typeError({ given_by: "should be number " }),
    given_at: yup
      .number()
      .required({ given_at: "required" })
      .typeError({ given_at: "should be number " }),
    comment: yup.string({ comment: "should be text" }).nullable(),
  });
};
