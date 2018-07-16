const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports.run = async (bot, message, args) => {

  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Нет, вы не можете сделать это, приятель!");
  let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
  if(!wUser) return message.reply("Couldn't find them yo");
  let warnlevel = warns[wUser.id].warns;

  message.reply(`<@${wUser.id}> у вас ${warnlevel} предупреждений.`);

}

module.exports.help = {
  name: "warnlevel"
}
