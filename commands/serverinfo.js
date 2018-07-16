const Discord = require('discord.js');
const botconfig = require('../botconfig.json');

module.exports.run = async (bot, message, args) => {
  let guild = message.guild;
  let icon = message.guild.iconURL;

  let createdAtRaw = guild.createdAt.toDateString();
  let createdAt = createdAtRaw.split(" ");
  let bots = message.guild.members.filter(m => m.user.bot).size;
  let humans = message.guild.members.filter(m => !m.user.bot).size;
  let channels = message.guild.channels.size;
  let textChannels = message.guild.channels.filter(m => m.type == "text").size;
  let voiceChannels = message.guild.channels.filter(i => i.type == "voice").size;
  let emojis = [];
  guild.emojis.forEach(emoji => {
  emojis.push(`\`${emoji}\``);
  });
  emojis.length === 0 ? emojis = "None" : emojis = emojis.join(", ");

  let roles = [];
  guild.roles.forEach(role => {
    roles.push(`\`${role.name}\``);
  });
  roles = roles.join(", ");

  let embed = new Discord.RichEmbed()
  .setTitle(`Информация о сервере!`)
  .setColor("#ff1aff")
  .setThumbnail(icon)
  .addField('Название сервера ', guild.name, true)
  .addField('Создатель сервера: ', `${guild.owner.user.tag}`, true)
  .addField('Создан в', `${createdAt[0]} ${createdAt[2]} ${createdAt[1]} ${createdAt[3]}`, true)
  .addField('Регион: ', guild.region.toUpperCase(), true)
  .addField('Кол-во учасников:', guild.memberCount, true)
  .addField('Ботов:', bots, true)
  .addField('Пользователей:', humans, true)
  .addField('Текстовых каналов', textChannels, true)
  .addField('Голосовых каналов', voiceChannels, true)
  .addField(`Ролей`, `${guild.roles.size}`, true)
  .addField(`Emojis`, `${guild.emojis.size}`, true)

  message.delete();
  return message.channel.send(embed).then(msg => {msg.delete(10000)});
}


module.exports.help = {
  name: "serverinfo"
}
