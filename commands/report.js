const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const red = botconfig.red;
const green = botconfig.green;
const orange = botconfig.orange;
const errors = require("../utils/errors.js");

module.exports.run = async (bot, message, args) => {
    message.delete();
    if(args[0] == "help"){
      message.reply("Используйте: !report <Позьзователь> <Причина>");
      return;
    }
    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(rUser.id == message.author.id) return message.channel.send("Вы не можите report себя!").then(msg => {msg.delete(10000)});
    if(!rUser) return errors.cantfindUser(message.channel);
    let rreason = args.join(" ").slice(22);
    if(!rreason) return errors.noReason(message.channel);

    let reportEmbed = new Discord.RichEmbed()
    .setDescription("Reports")
    .setColor(orange)
    .addField("Репорт на пользователя", `${rUser} с ID: ${rUser.id}`)
    .addField("Репорт от", `${message.author} с ID: ${message.author.id}`)
    .addField("Из текстового канал", message.channel)
    .addField("Время", message.createdAt)
    .addField("Причина", rreason);

    let reportschannel = message.guild.channels.find(`name`, "reports");
    if(!reportschannel) return message.channel.send("Не удалось найти канал Reports.");
    reportschannel.send(reportEmbed);

}

module.exports.help = {
  name: "report"
}
