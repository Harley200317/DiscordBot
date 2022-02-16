const { Permissions, MessageEmbed } = require("discord.js");
const Guild = require("../../models/Guild");

module.exports = async (client, message) => {
  const sendLogs = async function (userID, username, link, channelID, message) {
    const guildInfo = await Guild.findOne({ guildID: message.guild.id });
    const loggingChannel = guildInfo.loggingChannel; // DB Pulls Logs Channel Here
    if (guildInfo.logs === true) {
      const channel = client.channels.cache.get(loggingChannel); // Logs Channel ID
      const embed = new MessageEmbed()
        .setTitle(`ID: ${userID} :: Posted Link`)
        .addField("UserID:", userID, false)
        .addField("User:", `<@${userID}>`, false)
        .addField("Link:", link, false)
        .addField("Channel ID:", channelID, false)
        .addField("Channel URL:", message.url, false)
        .setTimestamp()
        .setColor("DARK_GOLD");
      channel.send({ embeds: [embed] });
    }
  };

  if (!message) return;
  if (message.author.bot) return;
  if (!message.guild) return;
  const messageUpper = message.content.toUpperCase();

  const guildInfo = await Guild.findOne({ guildID: message.guild.id });

  if (!guildInfo) {
    const newG = new Guild({ guildID: message.guild.id });
    newG.save();
  }

  if (guildInfo.protection === true) {
    if (message.content.includes(guildInfo.links)) {
      // message.delete()
    }
  }

  if (guildInfo.protection === true) {
    if (messageUpper.includes("@HERE") || messageUpper.includes("@EVERYONE")) {
      if (message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES))
        return;
      await message.delete();
      await message.channel
        .send(
          "Sorry you dont have Permission to mention `@here` or `@everyone`!"
        )
        .then((msg) => {
          setTimeout(() => msg.delete(), 60000);
        })
        .catch();
      sendLogs(
        message.member.id,
        message.member.username,
        message.content,
        message.channel.id,
        message
      );
    }
  }

  if (guildInfo.protection === true) {
    if (
      message.content.includes("http://") ||
      message.content.includes("https://")
    ) {
      if (message.content.includes(".ru/") || message.content.includes(".ru")) {
        if (guildInfo.russianLinks === true) {
          await message.delete();
          const embed = new MessageEmbed()
            .setTitle(":x: Russian Link Detected!")
            .setDescription(
              `**Type:** Russian Link\n**Purpose:** This Link Is Used For An Attacker to Gain Access To Your Account.\n**Link Details:**\n**URL Scan:** Coming Soon!`
            )
            .setTimestamp()
            .setColor("#2C2F33");
          await message.channel
            .send({ embeds: [embed] })
            .then((msg) => {
              setTimeout(() => msg.delete(), 60000);
            })
            .catch();
          sendLogs(
            message.member.id,
            message.member.username,
            message.content,
            message.channel.id,
            message
          );
        }
      } else if (
        messageUpper.includes("FREENITRO") ||
        messageUpper.includes("FREE NITRO")
      ) {
        if (guildInfo.nitroScams === true) {
          await message.delete();
          const embed = new MessageEmbed()
            .setTitle(":x: Phising Link Detected!")
            .setDescription(
              `**Type:** Discord Phishing Link\n**Purpose:** This Link Is Used For An Attacker to Gain Access To Your Account.\n**Link Details:**\n**URL Scan:** Coming Soon!`
            )
            .setTimestamp()
            .setColor("#2C2F33");
          await message.channel
            .send({ embeds: [embed] })
            .then((msg) => {
              setTimeout(() => msg.delete(), 60000);
            })
            .catch();
          sendLogs(
            message.member.id,
            message.member.username,
            message.content,
            message.channel.id,
            message
          );
        }
      } else if (message.content.includes("discorcl.org")) {
        if (guildInfo.russianLinks === true) {
          await message.delete();
          await message.channel
            .send(
              "Sorry, This Link Has Been Detected As Malicious. Please Do Not Advertise Malicious Links! :octagonal_sign:"
            )
            .then((msg) => {
              setTimeout(() => msg.delete(), 60000);
            })
            .catch();
          sendLogs(
            message.member.id,
            message.member.username,
            message.content,
            message.channel.id,
            message
          );
        }
      } else if (message.content.includes(".ru")) {
        await message.delete();
        await message.channel
          .send("Sorry, No Russian Links Allowed :octagonal_sign:")
          .then((msg) => {
            setTimeout(() => msg.delete(), 60000);
          })
          .catch();
        sendLogs(
          message.member.id,
          message.member.username,
          message.content,
          message.channel.id,
          message
        );
      } else if (message.content.includes(".ngrok.io")) {
        await message.delete();
        await message.channel
          .send("Sorry, No Kali Linux Phishing Sites Allowed :octagonal_sign:")
          .then((msg) => {
            setTimeout(() => msg.delete(), 60000);
          })
          .catch();
        sendLogs(
          message.member.id,
          message.member.username,
          message.content,
          message.channel.id,
          message
        );
      } else if (
        message.content.includes("steamcommunitya") ||
        message.content.includes("steamcomrrnunity")
      ) {
        await message.delete();
        await message.channel
          .send("Sorry, No Steam Phishing Sites Allowed :octagonal_sign:")
          .then((msg) => {
            setTimeout(() => msg.delete(), 60000);
          })
          .catch();
        sendLogs(
          message.member.id,
          message.member.username,
          message.content,
          message.channel.id,
          message
        );
      } else if (
        message.content.includes(".gift") ||
        message.content.includes(".gift/")
      ) {
        await message.delete();
        await message.channel
          .send(
            "Sorry, No Gift Links Allowed (Please Sent Any Gifts Via DM's With The Users Consent) :octagonal_sign:"
          )
          .then((msg) => {
            setTimeout(() => msg.delete(), 60000);
          })
          .catch();
        sendLogs(
          message.member.id,
          message.member.username,
          message.content,
          message.channel.id,
          message
        );
      } else if (message.content.includes("discordrgift")) {
        if (guildInfo.nitroScams === true) {
          await message.delete();
          const embed = new MessageEmbed()
            .setTitle(":x: Nitro Phishing Link Detected!")
            .setDescription(
              `**Type:** Discord Phishing Link\n**Purpose:** This Link Is Used For An Attacker to Gain Access To Your Account.\n**Link Details:**\n**URL Scan:** Coming Soon!`
            )
            .setTimestamp()
            .setColor("#2C2F33");
          await message.channel
            .send({ embeds: [embed] })
            .then((msg) => {
              setTimeout(() => msg.delete(), 60000);
            })
            .catch();
          sendLogs(
            message.member.id,
            message.member.username,
            message.content,
            message.channel.id,
            message
          );
        }
      } else if (
        messageUpper.includes("FREE") &&
        messageUpper.includes("NITRO") &&
        messageUpper.includes("GIFT")
      ) {
        if (guildInfo.nitroScams === true) {
          await message.delete();
          const embed = new MessageEmbed()
            .setTitle(":x: Phising Link Detected!")
            .setDescription(
              `**Type:** Discord Phishing Link\n**Purpose:** This Link Is Used For An Attacker to Gain Access To Your Account.\n**Link Details:**\n**URL Scan:** Coming Soon!`
            )
            .setTimestamp()
            .setColor("#2C2F33");
          await message.channel
            .send({ embeds: [embed] })
            .then((msg) => {
              setTimeout(() => msg.delete(), 60000);
            })
            .catch();
          sendLogs(
            message.member.id,
            message.member.username,
            message.content,
            message.channel.id,
            message
          );
        }
      } else if (
        messageUpper.includes("FREE") &&
        messageUpper.includes("NITRO")
      ) {
        if (guildInfo.nitroScams === true) {
          await message.delete();
          const embed = new MessageEmbed()
            .setTitle(":x: Phising Link Detected!")
            .setDescription(
              `**Type:** Discord Phishing Link\n**Purpose:** This Link Is Used For An Attacker to Gain Access To Your Account.\n**Link Details:**\n**URL Scan:** Coming Soon!`
            )
            .setTimestamp()
            .setColor("#2C2F33");
          await message.channel
            .send({ embeds: [embed] })
            .then((msg) => {
              setTimeout(() => msg.delete(), 60000);
            })
            .catch();
          sendLogs(
            message.member.id,
            message.member.username,
            message.content,
            message.channel.id,
            message
          );
        }
      } else if (
        messageUpper.includes("GIFT") &&
        messageUpper.includes("NITRO")
      ) {
        if (guildInfo.nitroScams === true) {
          await message.delete();
          const embed = new MessageEmbed()
            .setTitle(":x: Phising Link Detected!")
            .setDescription(
              `**Type:** Discord Phishing Link\n**Purpose:** This Link Is Used For An Attacker to Gain Access To Your Account.\n**Link Details:**\n**URL Scan:** Coming Soon!`
            )
            .setTimestamp()
            .setColor("#2C2F33");
          await message.channel
            .send({ embeds: [embed] })
            .then((msg) => {
              setTimeout(() => msg.delete(), 60000);
            })
            .catch();
          sendLogs(
            message.member.id,
            message.member.username,
            message.content,
            message.channel.id,
            message
          );
        }
      }
    } else if (
      messageUpper.includes("FREENITRO") ||
      messageUpper.includes("FREE NITRO")
    ) {
      if (guildInfo.nitroScams === true) {
        await message.delete();
        const embed = new MessageEmbed()
          .setTitle(":x: Phising Link Detected!")
          .setDescription(
            `**Type:** Discord Phishing Link\n**Purpose:** This Link Is Used For An Attacker to Gain Access To Your Account.\n**Link Details:**\n**URL Scan:** Coming Soon!`
          )
          .setTimestamp()
          .setColor("#2C2F33");
        await message.channel
          .send({ embeds: [embed] })
          .then((msg) => {
            setTimeout(() => msg.delete(), 60000);
          })
          .catch();
        sendLogs(
          message.member.id,
          message.member.username,
          message.content,
          message.channel.id,
          message
        );
      }
    } else if (message.content.includes(".ru")) {
      if (guildInfo.russianLinks === true) {
        await message.delete();
        await message.channel
          .send("Sorry, No Russian Links Allowed :octagonal_sign:")
          .then((msg) => {
            setTimeout(() => msg.delete(), 60000);
          })
          .catch();
        sendLogs(
          message.member.id,
          message.member.username,
          message.content,
          message.channel.id,
          message
        );
      }
    } else if (message.content.includes(".ngrok.io")) {
      await message.delete();
      await message.channel
        .send("Sorry, No Kali Linux Phishing Sites Allowed :octagonal_sign:")
        .then((msg) => {
          setTimeout(() => msg.delete(), 60000);
        })
        .catch();
      sendLogs(
        message.member.id,
        message.member.username,
        message.content,
        message.channel.id,
        message
      );
    } else if (
      message.content.includes("steamcommunitya") ||
      message.content.includes("steamcomrrnunity")
    ) {
      await message.delete();
      await message.channel
        .send("Sorry, No Steam Phishing Sites Allowed :octagonal_sign:")
        .then((msg) => {
          setTimeout(() => msg.delete(), 60000);
        })
        .catch();
      sendLogs(
        message.member.id,
        message.member.username,
        message.content,
        message.channel.id,
        message
      );
    } else if (
      message.content.includes(".gift") ||
      message.content.includes(".gift/")
    ) {
      await message.delete();
      await message.channel
        .send(
          "Sorry, No Gift Links Allowed (Please Sent Any Gifts Via DM's With The Users Consent) :octagonal_sign:"
        )
        .then((msg) => {
          setTimeout(() => msg.delete(), 60000);
        })
        .catch();
      sendLogs(
        message.member.id,
        message.member.username,
        message.content,
        message.channel.id,
        message
      );
    } else if (
      messageUpper.includes("FREE") &&
      messageUpper.includes("NITRO") &&
      messageUpper.includes("GIFT")
    ) {
      if (guildInfo.nitroScams === true) {
        await message.delete();
        const embed = new MessageEmbed()
          .setTitle(":x: Phising Link Detected!")
          .setDescription(
            `**Type:** Discord Phishing Link\n**Purpose:** This Link Is Used For An Attacker to Gain Access To Your Account.\n**Link Details:**\n**URL Scan:** Coming Soon!`
          )
          .setTimestamp()
          .setColor("#2C2F33");
        await message.channel
          .send({ embeds: [embed] })
          .then((msg) => {
            setTimeout(() => msg.delete(), 60000);
          })
          .catch();
        sendLogs(
          message.member.id,
          message.member.username,
          message.content,
          message.channel.id,
          message
        );
      } else if (
        messageUpper.includes("FREE") &&
        messageUpper.includes("DISCORD") &&
        messageUpper.includes("NITRO")
      ) {
        if (guildInfo.nitroScams === true) {
          await message.delete();
          const embed = new MessageEmbed()
            .setTitle(":x: Phising Link Detected!")
            .setDescription(
              `**Type:** Discord Phishing Link\n**Purpose:** This Link Is Used For An Attacker to Gain Access To Your Account.\n**Link Details:**\n**URL Scan:** Coming Soon!`
            )
            .setTimestamp()
            .setColor("#2C2F33");
          await message.channel
            .send({ embeds: [embed] })
            .then((msg) => {
              setTimeout(() => msg.delete(), 60000);
            })
            .catch();
          sendLogs(
            message.member.id,
            message.member.username,
            message.content,
            message.channel.id,
            message
          );
        }
      } else if (
        messageUpper.includes("FREE") &&
        messageUpper.includes("NITRO")
      ) {
        if (guildInfo.nitroScams === true) {
          await message.delete();
          const embed = new MessageEmbed()
            .setTitle(":x: Phising Link Detected!")
            .setDescription(
              `**Type:** Discord Phishing Link\n**Purpose:** This Link Is Used For An Attacker to Gain Access To Your Account.\n**Link Details:**\n**URL Scan:** Coming Soon!`
            )
            .setTimestamp()
            .setColor("#2C2F33");
          await message.channel
            .send({ embeds: [embed] })
            .then((msg) => {
              setTimeout(() => msg.delete(), 60000);
            })
            .catch();
          sendLogs(
            message.member.id,
            message.member.username,
            message.content,
            message.channel.id,
            message
          );
        }
      }
    }
  }
};
