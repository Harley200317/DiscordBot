const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("protect")
    .setDescription("Turns On Scamming / Links Protection")
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
      await guildInfo.updateOne({ protection: true });
      await interaction.reply("Core Protection Module Enabled!");
    } else if (enabled == false || enabled == "False") {
      const guildInfo = await global.Guild.findOne({
        guildID: interaction.guild.id,
      });
      await guildInfo.updateOne({ protection: false });
      await interaction.reply("Core Protection Module Disabled!");
    }
  },
};
