const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  message.delete();
message.channel.send(`🤕Пользователь 🔪<@${message.author.id}>🔪 совершил 👻 Самоубийство!`).then(msg => msg.delete(15000));
}

module.exports.help = {
  name: "suicide"
}
