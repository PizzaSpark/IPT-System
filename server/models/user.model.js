const mongoose = require('mongoose');
const { Schema, model: _model } = mongoose;

const requiredString = { type: String, required: true };

const User = new Schema(
  {
    firstname: requiredString,
    lastname: requiredString,
    middlename: requiredString,
    email: { ...requiredString, unique: true },
    password: requiredString,
  },
  { collection: "user-data" }
);

const model = _model("UserData", User);

module.exports = model;