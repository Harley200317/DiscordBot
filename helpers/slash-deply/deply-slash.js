const { SlashCommandBuilder } = require("@discordjs/builders");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { clientId, token } = require("./config.json");

const commands = [
  new SlashCommandBuilder()
    .setName("protect")
    .setDescription("Enables or Disables Scamming / Links Protection")
    .addBooleanOption((option) =>
      option
        .setName("enabled")
        .setDescription("Protection Enabled (True or False)")
        .setRequired(true)
    ),
  new SlashCommandBuilder()
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
  new SlashCommandBuilder()
    .setName("russianlinks")
    .setDescription("Enables or Disables Russian Link Detection")
    .addBooleanOption((option) =>
      option
        .setName("enabled")
        .setDescription("Russian Links Deletion Enabled (True or False)")
        .setRequired(true)
    ),
  new SlashCommandBuilder()
    .setName("nitroscams")
    .setDescription("Enables or Disables Nitro Scam Detection and Deletion")
    .addBooleanOption((option) =>
      option
        .setName("enabled")
        .setDescription(
          "Nitro Scams Detection & Deletion Enabled (True or False)"
        )
        .setRequired(true)
    ),
  new SlashCommandBuilder()
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
  new SlashCommandBuilder()
    .setName("donate")
    .setDescription(
      "Donate to provide our team with better resources to build the service you love!"
    ),
  new SlashCommandBuilder().setName("help").setDescription("Help Menu!"),
].map((command) => command.toJSON());

const rest = new REST({ version: "9" }).setToken(token);

rest
  .put(Routes.applicationCommands(clientId), { body: commands })
  .then(() => console.log("Successfully registered application commands."))
  .catch(console.error);
