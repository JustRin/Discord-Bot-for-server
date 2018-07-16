const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
  let embed = new Discord.RichEmbed()
    .setTitle("Categories")
    .setAuthor("Команды", bot.user.displayAvatarURL)
    .addField("Moderation", "`" + '\n !kick \n !ban \n !addrole \n !clear \n !mute \n !prefix \n !removerole \n !say \n !warn \n !warnlevel \n' + "`", true)
    .addField("Statistics", "`" + `\n !coins \n !dev \n !level \n` + " `", true)
    .addField("Developer", "`" + message.prefix + "dev`", true)
    // .addField("Other", "`" + `\n !botinfo \n !help \n !level \n` + " `", true)
    message.channel.send(embed);
    message.delete();
    message.channel.send(embed).then(msg => {msg.delete(25000)});
}
module.exports.help = {
    name: "h"
}
