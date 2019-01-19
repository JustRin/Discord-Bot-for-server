const Discord = require("discord.js");
const mysql = require("mysql");

module.exports.run = async (bot, message, args, member) => {
  var con = mysql.createConnection({
	host: "sql2.freesqldatabase.com",
	user: "sql2274820",
	password: "rA7%zR3!",
	database: "sql2274820"
});
    con.query(`SELECT * FROM rcbot WHERE "${message.author.id}" = did`, (err, result, rows, fields) =>{
		let lvlEmbed = new Discord.RichEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL)
        .setColor("#ffa64d");
        let pos = result.findIndex(obj => obj['did'] === message.author.id) + 1;
        let data = result[pos - 1];
		let time2 = data.time;
		let time = (time2/60).toFixed(0);
		lvlEmbed.addField("XP: ", `${data.xp}`, true)
		lvlEmbed.addField("Level  ", `${data.level}`, true)
		lvlEmbed.addField("Времени в войсе: ", `${time}` + ` мин.`, true)
		message.channel.send(lvlEmbed);
	});
}

module.exports.help = {
  name: "level"
}
