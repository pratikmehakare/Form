const mongoose = require("mongoose");

const FormSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
    },
    number: {
      type: Number,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    date: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Form", FormSchema);
