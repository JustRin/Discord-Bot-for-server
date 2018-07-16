const Discord = require("discord.js");
const fs = require("fs");
let coins = require("../coins.json");

module.exports.run = async (bot, message, args) => {
  //!buyname NAME

  let Coins = coins[message.author.id].coins;
  if(Coins < 200){
    return message.reply("У вас нет 200 монет для изменения никнейм!").then(msg => {msg.delete(10000)});
  }

  if(!args.length >= 1){
    return message.reply("Введите nickname который вы хотите! (Пример: !buyname RussianCommunity The Best!)");
  }

  coins[message.author.id] = {
    coins: Coins - 200
  };

    message.member.setNickname(args.slice(0).join(" "));
    return message.reply("Вы сменили ваш nickname!").then(msg => {msg.delete(10000)});



  fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
    if(err) cosole.log(err)
  });
}

module.exports.help = {
  name: "buyname"
}
