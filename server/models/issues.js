const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    _id: {
      type: String,
      trim: true,
      required: true,
    },
    addedBy: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
    },
    issueTitle: {
      type: String,
      trim: true,
      required: true,
    },
    issueDiscription: {
      type: String,
      trim: true,
      required: true,
    },
    isOpen: {
      type: String,
      default: "open",
    },
  },
  { timestamps: true }
);

module.exports = model("Issue", userSchema);
