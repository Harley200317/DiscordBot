const mongoose = require("mongoose");

const guildSchema = mongoose.Schema({
  guildID: { type: String, required: true },
  logs: { type: Boolean, default: false },
  loggingChannel: { type: String },
  protection: { type: Boolean, default: false },
  links: { type: Array },
  nitroScams: { type: Boolean, default: false },
  russianLinks: { type: Boolean, default: false },
});

let compiledModel = mongoose.model("Guild", guildSchema);
module.exports = compiledModel;
