const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
  name:String,
  description:String
});

module.exports = mongoose.model("Blog", BlogSchema);