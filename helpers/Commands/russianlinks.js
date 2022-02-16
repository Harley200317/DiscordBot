const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("russianlinks")
    .setDescription("Russian Links Detection and Deletion On / Off")
    .addBooleanOption((option) =>
      option
        .setName("enabled")
        .setDescription("Protection Enabled (True or False)")
        .setRequired(true)
    ),
  async execute(interaction) {
    const enabled = await interaction.options.getBoolean("enabled");
    if (enabled == true || enabled == "True") {
      const guildInfo = await global.Guild.findOne({
        guildID: interaction.guild.id,
      });
      await guildInfo.updateOne({ russianLinks: true });
      await interaction.reply("Russian Links Detection & Delete Enabled!");
    } else if (enabled == false || enabled == "False") {
      const guildInfo = await global.Guild.findOne({
        guildID: interaction.guild.id,
      });
      await guildInfo.updateOne({ russianLinks: false });
      await interaction.reply("Russian Links Detection & Delete Disabled!");
    }
  },
};
