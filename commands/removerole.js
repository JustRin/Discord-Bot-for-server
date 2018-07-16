const Discord = require("discord.js");
const errors = require("../utils/errors.js");

module.exports.run = async (bot, message, args) => {

  if (!message.member.hasPermission("MANAGE_ROLES")) return errors.noPerms(message, "MANAGE_ROLES");
  if(args[0] == "help"){
    message.reply("Используйте: !removerole <Позьзователь> <роль>");
    return;
  }
  let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(!rMember) return message.reply("Не удалось найти пользователя.");
  let role = args.join(" ").slice(22);
  if(!role) return message.reply("Укажите роль!");
  let gRole = message.guild.roles.find(`name`, role);
  if(!gRole) return message.reply("Не удалось найти роль.");

  if(!rMember.roles.has(gRole.id)) return message.reply("У него нет этой роли.");
  await(rMember.removeRole(gRole.id));

  try{
    await rMember.send(`RIP, вы потеряли ${gRole.name} роль.`)
  }catch(e){
    message.channel.send(`RIP <@${rMember.id}>, Мы удалили ${gRole.name} от вас.`)
  }
}

module.exports.help = {
  name: "removerole"
}
