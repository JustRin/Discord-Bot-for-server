const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  message.delete();
message.channel.send(`Мы не ведём статистики, <@${message.author.id}>, это не магазин. Возможно ты хотел узнать какой у тебя уровень? Напиши: !level. Все команды ты можешь узнать командой: !h. `).then(msg => msg.delete(15000));
}

module.exports.help = {
  name: "stats"
}
