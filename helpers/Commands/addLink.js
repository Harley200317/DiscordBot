const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("blacklist")
    .setDescription("Add Blacklisted Link")
    .addBooleanOption((option) =>
      option
        .setName("type")
        .setDescription("True = Add Link, False = Remove Link")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("blacklist")
        .setDescription("Blacklisted Website, URL or Word to add or remove")
    ),
  async execute(interaction) {
    const guildInfo = await global.Guild.findOne({
      guildID: interaction.guild.id,
    });
    const type = await interaction.options.getBoolean("type");
    const link = await interaction.options.getString("link");
    if (type == true || type == "True") {
      await guildInfo.updateOne({
        links: [link],
      });
      await interaction.reply(
        `Added Blacklist: ${link}\n**Current Blacklist:**\n${guildInfo.links}`
      );
    } else if (type == false || type == "False") {
      // await guildInfo.updateOne({ logs: false });
      // await interaction.reply('Logging Disabled!');
    }
  },
};
