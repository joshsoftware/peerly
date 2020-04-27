import postJson from "utils/postJson.js";

export default (params) => postJson({ ...params, method: "PATCH" });
