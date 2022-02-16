const { KSoftClient } = require("@ksoft/api");

module.exports = (client) => {
  client.ksoft = new KSoftClient("06564f2ee7066efb4a19d467d0563b59c3e7eec5");
};
