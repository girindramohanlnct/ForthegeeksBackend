const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const post = mongoose.Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true, unique: true},
  content: { type: String, required: true, unique: true},
  keyword: { type: String, required: true },
  type: { type: String, required: true },
  videoUrl: { type: String },
  nextPage: { type: String },
  previousPage: { type: String },
  subject: { type: String, required: true },
  subTopic: { type: String, required: true },
});

post.plugin(uniqueValidator);
module.exports = mongoose.model("Post", post);