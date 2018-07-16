const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let shop = new Discord.RichEmbed()
  .setDescription("*Список команд Shop*")
  .setColor("#000000")
  .addField("Смена никнейма **200 монет**.", '`!buyname`', true)
  .addField("Купить комнату на 1 день **5000 монет**.", '`!buyroom`', true)
  .addField("Продлить комнату на (число) дней **4500 монет**", '`!buyextend`', true)
  .addField("Поднять комнату на 1 позицию вверх **500 монет**.", '`!roomup`', true)
  .addField("Опустить комнату на 1 позицию вниз **500 монет**.", '`!roomdown`', true)
  message.channel.send(shop);
}

module.exports.help = {
  name:"shop"
}
