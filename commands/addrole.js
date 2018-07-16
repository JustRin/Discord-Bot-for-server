const Discord = require("discord.js");
const errors = require("../utils/errors.js");

module.exports.run = async (bot, message, args) => {

  //!addrole @andrew Dog Person
  if (!message.member.hasPermission("MANAGE_ROLES")) return errors.noPerms(message, "MANAGE_ROLES");
  if (args[0] == "help") {
    message.reply("Используйте: !addrole <Пользователь> <Роль>");
    return;
  }
  let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if (!rMember) return errors.cantfindUser(message.channel);
  let role = args.join(" ").slice(22);
  if (!role) return message.reply("Укажите роль!");
  let gRole = message.guild.roles.find(`name`, role);
  if (!gRole) return message.reply("Не удалось найти эту роль.");

  if (rMember.roles.has(gRole.id)) return message.reply("У него уже есть эта роль.");
  await (rMember.addRole(gRole.id));

  try {
    await rMember.send(`Поздравляем, вам дали роль ${gRole.name}`)
  } catch (e) {
    console.log(e.stack);
    message.channel.send(`Поздравляем <@${rMember.id}>, была дана роль ${gRole.name}.`)
  }
}

module.exports.help = {
  name: "addrole"
}
