const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "must provide title"],
    trim: true,
  },

  discription: {
    type: String,
    required: [true, "must provide discription"],
    trim: true,
  },

  completed: {
    type: Boolean,
    default: false,
  },
  favourite: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Todo", TodoSchema);
