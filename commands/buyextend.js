const Discord = require("discord.js");
const fs = require("fs");
let coins = require("../coins.json");

module.exports.run = async (bot, message, args) => {
  //!buyname NAME

  let Coins = coins[message.author.id].coins;
  if(Coins < 4500){
    return message.reply("У вас нет 4500 монет для продления комнаты!").then(msg => {msg.delete(10000)});
  }

  if(!args.length >= 1){
    return message.reply("Введите кол-во дней! `(Пример: !buyextend 10!)`");
  }

  coins[message.author.id] = {
    coins: Coins - 4500
  };

    // message.member.setNickname(args.slice(0).join(" "));
    return message.reply("Вы продлили комнату на `N` дней!").then(msg => {msg.delete(10000)});



  fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
    if(err) cosole.log(err)
  });
}

module.exports.help = {
  name: "buyextend"
}
