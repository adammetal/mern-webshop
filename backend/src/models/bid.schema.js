const mongoose = require("mongoose");

const { Schema } = mongoose;

const bidSchema = new Schema({
  name: String,
  amount: Number,
  time: {
    type: Date,
    default: Date.now(),
  },
  card: {
    type: Schema.Types.ObjectId,
    ref: 'Card'
  }
});

module.exports = mongoose.model("Bid", bidSchema);
