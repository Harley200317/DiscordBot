const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder().setName("help"),
  async execute(interaction) {
    interaction.reply(
      "__**Slash Command Run Down**__\nWhen you invite the bot, a few things must be configured before deployment. Please see this section for a description of what command does.\n\n__**/Protection**__\nThis command simply toggles on or off the bot's protection capabilities. Set the value of this command to false to temporarily stop server protection measures, should you encounter a bug\n\n__**/Logs**__\nThis command allows you to toggle a logs channel, for all of the various violations that can occur, should your server come under attack.\n__**/RussianLinks**__\nThis command will enforce a blanket ban on Russian originating web pages. Note, this is not a requirement for operation, and is just another precaution, as a lot of phishing attacks originate out of the CUS region. Only enforce this if you want a ***complete*** ban on their domains.\n\n__**/NitroScams**__\nAs <@&901459271273816119> does not specifically target *just* Nitro scams, we have decided to make this a togglable option for server administrators. By setting this to a true value, you can start to enforce a ban on spam originating from CSRF compromised accounts. With this feature, you no longer have to issue just a blanket ban.\n\n"
    );
  },
};
