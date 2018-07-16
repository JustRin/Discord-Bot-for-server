const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {
        let pEmbed = new Discord.RichEmbed()
        .setColor(message.guild.me.displayHexColor)
        .setTitle('Ping!')
        .addField('Latency', ((message.createdTimestamp - new Date().getTime()) / 10 ) + ' ms', true)
        .addField('Pong', (` ${msg.createdTimestamp - message.createdTimestamp}`) + ' ms', true)
        .addField('Server' , `${(bot.ping)/10} ms`, true);
         message.channel.send(pEmbed);
}


module.exports.help = {
  name: "ping"
}
