const mongoose = require("mongoose");

const { Schema } = mongoose;

const cardSchema = new Schema({
  name: String,
  scryId: String,
  price: Number,
  image: String,
});

module.exports = mongoose.model("Card", cardSchema);
