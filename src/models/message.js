const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const message = mongoose.Schema({
  name: { type: String, required: true },
  to: { type: String, required: true },
  phone: { type: Number, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
});

message.plugin(uniqueValidator);
module.exports = mongoose.model("Message", message);
