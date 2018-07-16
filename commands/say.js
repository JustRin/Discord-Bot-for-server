const Discord = require("discord.js");
const errors = require("../utils/errors.js");

module.exports.run = async (bot, message, args) => {

  message.delete();
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return errors.noPerms(message, "MANAGE_MESSAGES");
  let botmessage = args.join(" ");
  message.channel.send(botmessage);

  let sayChannel = message.guild.channels.find(`name`, "bot");
  if(!sayChannel) return message.channel.send("Невозможно найти канал bot");

  sayChannel.send(`Воспользовался say ${message.author.username} \n В (${message.createdAt}) n\ c словами ${message}`);
}

module.exports.help = {
  name: "say"
}
