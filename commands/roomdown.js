const Discord = require("discord.js");
const fs = require("fs");
let coins = require("../coins.json");

module.exports.run = async (bot, message, args) => {
  //!buyname NAME

  let Coins = coins[message.author.id].coins;
  if(Coins < 500){
    return message.reply("У вас нет 500 монет!").then(msg => {msg.delete(10000)});
  }

  coins[message.author.id] = {
    coins: Coins - 500
  };

    return message.reply("Ваша комната была опущена на 1 позицию вниз!").then(msg => {msg.delete(10000)});

  fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
    if(err) cosole.log(err)
  });
}

module.exports.help = {
  name: "roomdown"
}
