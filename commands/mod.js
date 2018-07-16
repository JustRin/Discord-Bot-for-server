const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

let embed = new Discord.RichEmbed()
    .setTitle("<:TAmod:444855093569781760> Moderation")
    .addField("`" + message.prefix + "ban`", "Бан.")
    .addField("`" + message.prefix + "clear`", "Удаление определённое кол-во сообщений.")
    .addField("`" + message.prefix + "kick`", "Выгнать с сервера.")
    .addField("`" + message.prefix + "mute`", "Замутить на время.")
    .setFooter("Требуется канал мод-журнала.")

message.channel.send(embed);
}

module.exports.help = {
  name: "mod"
}
