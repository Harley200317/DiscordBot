const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("donate")
    .setDescription("Add Blacklisted Link"),
  async execute(interaction) {
    await interaction.reply(`Donate: https://ko-fi.com/maximking1`);
  },
};
