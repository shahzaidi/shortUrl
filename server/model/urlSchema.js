const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
  originalURL: {
    type: String,
    required: true,
  },
  shortenURL: {
    type: String,
    required: true,
  },
});

const Path = mongoose.model("path", urlSchema);

module.exports = Path;
