const Discord = require("discord.js");
const fs = require("fs");
let coins = require("../coins.json");

module.exports.run = async (bot, message, args) => {
  //!pay @isatisfied 59345

  if(!coins[message.author.id]){
    return message.reply("У вас нет монет!").then(msg => {msg.delete(10000)});
  }

  if(isNaN(args[1])){
      return message.reply("Вам нужно указать число.").then(msg => {msg.delete(10000)});
  }

  if(!parseInt(args[1])){
  return message.channel.send("Вы должны указать число!").then(msg => {msg.delete(10000)});
  }



  let pUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(pUser.id == message.author.id) return message.channel.send("Вы не можите передать монеты сами себе!").then(msg => {msg.delete(10000)});

  if(!coins[pUser.id]){
    coins[pUser.id] = {
      coins: 0
    };
  }

  let pCoins = coins[pUser.id].coins;
  let sCoins = coins[message.author.id].coins;

  let divided = parseInt(args[1]) * 0.05;
  let give = parseInt(args[1]) - divided

  if(sCoins < parseInt(args[1])) return message.reply("У вас недостаточно монет!").then(msg => {msg.delete(10000)});

  coins[message.author.id] = {
    coins: sCoins - parseInt(args[1])
  };

  coins[pUser.id] = {
    coins: pCoins + give
  };

  message.channel.send(`${message.author} перевёл ${pUser} ${args[1]} монет(-у).`).then(msg => {msg.delete(10000)});

  fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
    if(err) cosole.log(err)
  });


}

module.exports.help = {
  name: "pay"
}
