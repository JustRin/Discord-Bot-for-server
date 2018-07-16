const Discord = require("discord.js");
const botconfig = require("../botconfig");
let purple = botconfig.purple;
let xp = require("../xp.json");
let Time = require("../VoiceTime.json");

module.exports.run = async (bot, message, args) => {

  if(!xp[message.author.id]){
   xp[message.author.id] = {
     xp: 0,
     level: 1
  };
}
if(!Time[message.author.id]){
   Time[message.author.id] = {
     time: 0
  };
}


  let curxp = xp[message.author.id].xp;
  let curlvl = xp[message.author.id].level;
  let curtime = Time[message.author.id].time;
  let curxpp = (curxp + 0).toFixed(2);
  let levl = (curlvl * 0.01 + 0.04).toFixed(2)
  let nxtLvlXp = curlvl * 1000;
  let difference = (nxtLvlXp - curxp).toFixed(2);
  let dif = (curtime / 60);
  let diff = (dif / 60).toFixed(2);
  let lvlEmbed = new Discord.RichEmbed()
  .setAuthor(message.author.username)
  .setColor("#ffa64d")
  .addField("Level  ", curlvl, true)
  .addField("XP  ", curxpp, true)
  .addField("Времени в войсе  ", `${diff}` + ` ч.`, true)
  .addField("Монет в секунду  ", `${levl}`, true)
  .addField("Моножитель опыта ", `х1`, true)
  .setFooter(`${difference} XP до следующего уровня   `, message.author.displayAvatarURL);

  message.delete();
  message.channel.send(lvlEmbed).then(msg => {msg.delete(10000)});

}

module.exports.help = {
  name: "level"
}
