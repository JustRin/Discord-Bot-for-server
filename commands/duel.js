const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  if(!coins[message.author.id]){
    return message.reply("У вас нет монет!").then(msg => {msg.delete(10000)});
  }

  if(isNaN(args[1])){
      return message.reply("Вам нужно указать число.").then(msg => {msg.delete(10000)});
  }

  if(!parseInt(args[1])){
  return message.channel.send("Вы должны указать число!").then(msg => {msg.delete(10000)});
  }





}

module.exports.help = {
  name: "1vs1"
}
