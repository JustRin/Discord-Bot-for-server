const Discord = require("discord.js");
const ms = require("ms");
const botconfig = require("../botconfig.json");
const red = botconfig.red;
const green = botconfig.green;
const orange = botconfig.orange;

module.exports.run = async (bot, message, args) => {


  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("No can do.");
  if(args[0] == "help"){
    message.reply("Используйте: !mute <Пользователь> <1s/m/h/d>");
    return;
  }

  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!tomute) return message.reply("Не удалось найти пользователя.");
  if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("Не могу 'mute' его!");
  let reason = args.slice(2).join(" ");
  if(!reason) return message.reply("Пожалуйста, укажите причину.");

  let muterole = message.guild.roles.find(`name`, "muted");
  //start of create role
  if(!muterole){
    try{
      muterole = await message.guild.createRole({
        name: "muted",
        color: "#000000",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }
  //end of create role
  let mutetime = args[1];
  if(!mutetime) return message.reply("Вы не указали время!");

  message.delete().catch(O_o=>{});

  try{
    await tomute.send(`Здравствуй! Вы были отключены на ${mutetime}. Извините!`)
  }catch(e){
    message.channel.send(`Пользователь отключен. Они будут отключены на ${mutetime}`)
  }

  let muteembed = new Discord.RichEmbed()
  .setDescription(`Mute executed by ${message.author}`)
  .setColor(orange)
  .addField("Muted пользователя", tomute)
  .addField("Muted в чате", message.channel)
  .addField("Время", message.createdAt)
  .addField("Length", mutetime)
  .addField("Причина", reason);

  let incidentschannel = message.guild.channels.find(`name`, "muted");
  if(!incidentschannel) return message.reply("Пожалуйста, сначала создайте канал muted!");
  incidentschannel.send(muteembed);

  await(tomute.addRole(muterole.id));

  setTimeout(function(){
    tomute.removeRole(muterole.id);
    message.channel.send(`<@${tomute.id}> unmuted!`);
  }, ms(mutetime));


//end of module
}

module.exports.help = {
  name: "mute"
}
