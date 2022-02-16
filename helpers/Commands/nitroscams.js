const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("nitroscams")
    .setDescription("Nitro Scams Detection")
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
      await guildInfo.updateOne({ nitroScams: true });
      await interaction.reply(
        "Nitro Scam Detection Enabled, All Free Nitro Scams Will Be Removed!"
      );
    } else if (enabled == false || enabled == "False") {
      const guildInfo = await global.Guild.findOne({
        guildID: interaction.guild.id,
      });
      await guildInfo.updateOne({ nitroScams: false });
      await interaction.reply(
        "Nitro Scam Detection Disabled, All Free Nitro Scams Will Not Be Removed!"
      );
    }
  },
};
