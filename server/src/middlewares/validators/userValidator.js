require("../../../config/database");
const User = require("../../models/User");
const { body } = require("express-validator");

exports.validateUsername = async (req, res, next) => {
   const data = await User.findOne({ username: req.params.username });

   if (data) {
      return res.json({ status: "fail", message: "Username Sudah Terdaftar" });
   }

   return res.json({ status: "success", message: "Username Dapat Digunakan" });
};

exports.validateEmail = async (req, res, next) => {
   const data = await User.findOne({ email: req.params.email });

   if (data) {
      return res.json({ status: "fail", message: "Email Sudah Terdaftar" });
   }

   return res.json({ status: "success", message: "Email Dapat Digunakan" });
};
