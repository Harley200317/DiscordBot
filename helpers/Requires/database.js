const mongoose = require("mongoose");

module.exports = (client) => {
  client.once("ready", () => {
    mongoose.connect(process.env.MONGOSTRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    mongoose.connection.on("open", function (ref) {
      console.log("[DATABASE] Connected To MongooseDB Server.");
    });
  });
};
