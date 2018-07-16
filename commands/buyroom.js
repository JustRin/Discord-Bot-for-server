const Discord = require("discord.js");
const fs = require("fs");
let coins = require("../coins.json");
// let coins = require("../time.json");

module.exports.run = async (bot, message, args) => {
  //!buyroom

  let Coins = coins[message.author.id].coins;
  if(Coins < 5000){
    return message.reply("You dont have 5000 coins for create room!").then(msg => {msg.delete(10000)});
  }


  coins[message.author.id] = {
    coins: Coins - 5000
  };

// let time = time[channel.createAt].time;
    var server = message.guild;
    var name = message.author.username;
    server.createChannel("Room " + name, 'voice').then(
        (chan) => {
            chan.setParent("460863784618033165").then(
                (chan2) => {
                    console.log("stage 3");
                    console.log(chan2);
                    chan2.overwritePermissions(message.guild.roles.find('name', '@everyone'), {
                      'CREATE_INSTANT_INVITE' : false,        'VIEW_CHANNEL': true,
                         'CONNECT': false,                       'SPEAK': false,
                         'MANAGE_ROLES_OR_PERMISSIONS': false,                       'MANAGE_CHANNELS': false
                      });

                      chan2.overwritePermissions(message.member,{'MANAGE_ROLES_OR_PERMISSIONS':true, 'MANAGE_CHANNELS':true});
                        console.log("stage 4");
                }
            ).catch(console.error);
        }
    ).catch(console.error);

    return message.reply("You buy room on 1 day!").then(msg => {msg.delete(10000)});

  // time[channel.createAt]={
  //   time: channel.createAt
  // }

  fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
    if(err) cosole.log(err)
  });
}

module.exports.help = {
  name: "buyroom"
}
