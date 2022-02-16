const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("logs")
    .setDescription("Turns On Scamming / Links Logs")
    .addBooleanOption((option) =>
      option
        .setName("enabled")
        .setDescription("Logging Enabled (True or False)")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("channel").setDescription("Logging Channel ID")
    ),
  async execute(interaction) {
    const enabled = await interaction.options.getBoolean("enabled");
    const channel = await interaction.options.getString("channel");
    if (enabled == true || enabled == "True") {
      const guildInfo = await global.Guild.findOne({
        guildID: interaction.guild.id,
      });
      await guildInfo.updateOne({ logs: true, loggingChannel: channel });
      await interaction.reply("Logging Enabled!");
    } else if (enabled == false || enabled == "False") {
      const guildInfo = await global.Guild.findOne({
        guildID: interaction.guild.id,
      });
      await guildInfo.updateOne({ logs: false });
      await interaction.reply("Logging Disabled!");
    }
  },
};
