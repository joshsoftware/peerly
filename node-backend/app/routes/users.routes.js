const express = require("express");
const bodyParser = require("body-parser");
const yup = require("yup"); //eslint-disable-line node/no-extraneous-require

const usersController = require("../controllers/usersController");
const usersRouter = express.Router();
usersRouter.use(bodyParser.urlencoded({ extended: true }));
usersRouter.get(
  "/users/:id",
  (req, res, next) => {
    const users = {
      id: req.params.id,
    };
    const schema = yup.object().shape({
      id: yup.number().required(),
    });
    schema.isValid(users).then(function (valid) {
      if (valid) {
        next();
      } else {
        res.status(400).send({
          error: {
            message: "invalid id must be in integer",
          },
        });
      }
    });
  },
  usersController.findUsersByOrg
);
module.exports = usersRouter;
