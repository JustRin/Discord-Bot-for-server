const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  message.delete();
  let User = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(User.id == message.author.id) return message.channel.send("Хмм, мб суицыд? !suicide").then(msg => {msg.delete(5000)});
message.channel.send(`<@${message.author.id}> совершил убийство 🔪${User} теперь он мёртв!`).then(msg => msg.delete(15000));
}

module.exports.help = {
  name: "kill"
}
