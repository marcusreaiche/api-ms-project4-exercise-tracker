const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const exerciseSchema = new Schema({
  userId: {
    type: ObjectId,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Exercise", exerciseSchema);
