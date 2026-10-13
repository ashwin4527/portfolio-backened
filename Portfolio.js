
const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  role: String,
  about: String,
  email: String,
  skills: [String],
  projects: [
    {
      title: String,
      description: String,
      technology: [String]
    }
  ]
});

module.exports = mongoose.model("Portfolio", portfolioSchema);
