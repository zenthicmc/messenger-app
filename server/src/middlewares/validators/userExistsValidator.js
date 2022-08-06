require("../../../config/database");
const User = require("../../models/User");
const emailValidator = require("email-validator");

exports.validateUsername = async (req, res, next) => {
   const data = await User.findOne({ username: req.params.username });

   if (data) {
      return res.json({ status: "fail", message: "Username has exists" });
   }

   return res.json({ status: "success", message: "Username can be used" });
};

exports.validateEmail = async (req, res, next) => {
   const email = emailValidator.validate(req.params.email);

   if (email !== true) {
      return res.json({ status: "fail", message: "Invalid Email" });
   }

   const data = await User.findOne({ email: req.params.email });

   if (data) {
      return res.json({ status: "fail", message: "Email has exists" });
   }

   return res.json({ status: "success", message: "Email can be used" });
};
