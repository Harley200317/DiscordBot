const Guild = require("../../models/Guild");
const { Permissions } = require("discord.js");

module.exports = async (client, interaction) => {
  if (!interaction.isCommand()) return;
  const { commandName } = interaction;
  const guildInfo = await Guild.findOne({ guildID: interaction.guild.id });

  if (!guildInfo) {
    const newG = new Guild({ guildID: interaction.guild.id });
    newG.save();
  }
  okay;
  if (!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES))
    return;

  if (commandName === "protect") {
    await guildInfo.updateOne({ protection: true });
    await interaction.reply("Core Protection Module Enabled!");
  } else if (commandName === "protect-off") {
    await guildInfo.updateOne({ protection: false });
    await interaction.reply("Core Protection Module Disabled!");
  } else if (commandName === "logs") {
    const channel = await interaction.options.getString("channel");
    await guildInfo.updateOne({ logs: true, loggingChannel: channel });
    await interaction.reply("Logging Enabled");
  } else if (commandName === "logs-off") {
    await guildInfo.updateOne({ logs: false });
    await interaction.reply("Logging Disabled");
  } else if (commandName === "russianlinks") {
    await guildInfo.updateOne({ russianLinks: true });
    await interaction.reply("Russian Links Detection & Delete Enabled");
  } else if (commandName === "russianlinksoff") {
    await guildInfo.updateOne({ russianLinks: false });
    await interaction.reply("Russian Links Detection & Delete Disabled");
  } else if (commandName === "nitroscam") {
    await guildInfo.updateOne({ nitroScams: true });
    await interaction.reply(
      "Nitro Scam Detection Enabled, All Free Nitro Scams Will Be Removed!"
    );
  } else if (commandName === "nitroscamoff") {
    await guildInfo.updateOne({ nitroScams: false });
    await interaction.reply(
      "Nitro Scam Detection Disabled, All Free Nitro Scams Will Not Be Removed!"
    );
  }
};
