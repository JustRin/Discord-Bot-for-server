const Discord = require("discord.js");
const mysql = require("mysql");

module.exports.run = async (bot, message, args) => {
  var con = mysql.createConnection({
	host: "sql2.freesqldatabase.com",
	user: "sql2274820",
	password: "rA7%zR3!",
	database: "sql2274820"
});
    con.query(`SELECT * FROM rcbot ORDER BY time DESC`, (err, result, rows, fields) =>{
        let toplevels = new Discord.RichEmbed()
        .setDescription("**Top 10  :new_moon_with_face:**")
        .setColor("#4d4dff");


        for (let index = 0; index < 10; index++) {
            if(result[index] !=null) {
        let guildMember = bot.users.get(result[index])
		let username = guildMember == null ? "Unnamed" : guildMember.username
                 toplevels.addField(`#${index+1} <@${username}>`, `**XP: ** ${result[index].xp} | **LVL:** ${result[index].level} | **Time:** ${result[index].time} `);
            }
        }


        toplevels.addField(`===========================================================`)
        let pos = result.findIndex(obj => obj['did'] === message.author.id) + 1;
        let data = result[pos - 1];
		
        toplevels.addField(`"Your position"#${pos} ${message.author.username}`, `**XP:** ${data.xp} | **LVL:** ${data.level} | **Time:** ${data.time} `)
        message.channel.send(toplevels);
    });
  
}


module.exports.help = {
  name:"toplevels"
}
