const yup = require("yup");

module.exports.reportSchema = () => {
  return yup.object().shape({
    recognition_id: yup
      .number()
      .typeError({ recognition_id: "should be number" })
      .required({ recognition_id: "required" }),
    type_of_reporting: yup
      .string()
      .oneOf(["fraud", "not_relevant", "incorrect"], {
        mark_as: "must be the following values: fraud, not_relevant, incorrect",
      })
      .required({ type_of_reporting: "required" }),
    reason_for_reporting: yup.string().required({ reason: "required" }),
    reported_by: yup
      .number()
      .typeError({ reported_by: "should be number" })
      .required(),
    reported_at: yup
      .number()
      .typeError({ reported_on: "should be number" })
      .required({ reported_at: "required" }),
  });
};

module.exports.reviewSchema = () => {
  return yup.object().shape({
    recognition_id: yup
      .number()
      .typeError({ recognition_id: "should be number" })
      .required({ recognition_id: "required" }),
    is_inappropriate: yup
      .boolean()
      .typeError({ is_inappropriate: "should be boolean value" })
      .required({ is_inappropriate: "required" }),
    moderator_comment: yup.string(),
    moderated_by: yup
      .number()
      .typeError({ moderator_by: "should be number" })
      .required({ moderated_by: "required" }),
    moderated_at: yup.number().typeError({ reported_on: "should be number" }),
  });
};
