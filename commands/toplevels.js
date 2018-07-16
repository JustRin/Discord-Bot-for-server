const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let toplevels = new Discord.RichEmbed()
  // 
  // let xp = xp[message.author.id].xp;
  // let lvl = xp[message.author.id].level;
  // let time = Time[message.author.id].time;
  // var max = Math.max.apply(null, xp);

  .setDescription("**Top 10 пользователей на сервере 🌚**")
  .setColor("#4d4dff")
  .addField(`#1 ${Name}`, "**XP: ** `${max}` | **LVL:** `NaN` | **Время в войсе:** `NaN` ")
  .addField(`#2 ${Name}`, "**XP:** `NaN` | **LVL:** `NaN` | **Время в войсе:** `NaN` ")
  .addField(`#3 ${Name}`, "**XP:** `NaN` | **LVL:** `NaN` | **Время в войсе:** `NaN` ")
  .addField(`#4 ${Name}`, "**XP:** `NaN` | **LVL:** `NaN` | **Время в войсе:** `NaN` ")
  .addField(`#5 ${Name}`, "**XP:** `NaN` | **LVL:** `NaN` | **Время в войсе:** `NaN` ")
  .addField(`#6 ${Name}`, "**XP:** `NaN` | **LVL:** `NaN` | **Время в войсе:** `NaN` ")
  .addField(`#7 ${Name}`, "**XP:** `NaN` | **LVL:** `NaN` | **Время в войсе:** `NaN` ")
  .addField(`#8 ${Name}`, "**XP:** `NaN` | **LVL:** `NaN` | **Время в войсе:** `NaN` ")
  .addField(`#9 ${Name}`, "**XP:** `NaN` | **LVL:** `NaN` | **Время в войсе:** `NaN` ")
  .addField(`#10 ${Name}`, "**XP:** `NaN` | **LVL:** `NaN` | **Время в войсе:** `NaN` ")
  message.channel.send(toplevels);
}

module.exports.help = {
  name:"toplevels"
}
