/*
Create by Evgeniy Yurenya
Create in 07/16/2018
Last Update 02/15/2020
Link to a profile in social networks: https://vk.com/id118216244
*/

const botconfig = require("./botconfig.json"); //Connection of a configuration file
const Discord = require("discord.js"); // Connection API discord
const token = "NDgxNzg1MDg2NDM4NTM5Mjc1.DwQ2Rg.tJhGCJ0fsSIsrJn-6AC5muSvwcU"; //Token for entry
const PORT = process.env.PORT || 5000
const fs = require("fs");
const mysql = require("mysql");
const bot = new Discord.Client(); //start work client app
let Voice = []; //Array for counting time
bot.commands = new Discord.Collection();
//------Packaging Results in JSON(include a JSON files)-----------//
let coins = require("./coins.json");
let warn = require("./warnings.json");
let Vtime = require("./VoiceTime.json");
let Mtime = require("./coins.json");
let Xtime = require("./xp.json");
//----------------------------------------------------------------//
let purple = botconfig.purple;
let cooldown = new Set();
let cdseconds = 5;


//Connecting modules and starting them
fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if(jsfile.length <= 0){
    console.log("Не удалось найти команды.");
    return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} загружен!`);
    bot.commands.set(props.help.name, props);
  });
});

//Database Connection
var con = mysql.createConnection({
	host: "sql2.freesqldatabase.com",
	user: "sql2274820",
	password: "rA7%zR3!",
	database: "sql2274820"
});

//Check for errors in the database
con.connect(err => {
	if(err) throw err;
	console.log("Connected to DB");
});

//Start bot
bot.on("ready", async () => {
  console.log(`${bot.user.username} is online on ${bot.guilds.size} servers!`);
  bot.user.setActivity("I just see you", {type: "TEXT"});
});


//Checking voice channels for presence of active users
bot.on("voiceStateUpdate", (OldM, NewM, message)=> {
    console.log(Voice);
    if(Voice.find(m => m.id === NewM.id)){
        return;
    }
    if(NewM.voiceChannel){
        let number = 0;
        Voice.push(NewM);
        function send(number) {
            console.log(number, NewM.id, coins);

            let check = 0;
            if (!NewM.voiceChannel) {
                check = 1;

                if(!Vtime[NewM.id]){
                    Vtime[NewM.id] = {
                        time: 0
                    }
                }


                if(!Mtime[NewM.id]){
                    Mtime[NewM.id] = {
                        coins: 0
                        }
                    }
                if(!Xtime[NewM.id]){
                        Xtime[NewM.id] = {
                          xp: 0,
                          level: 1
                            }
                        }

                let curTime = Vtime[NewM.id].time;
                let curTim = Mtime[NewM.id].coins;
                let curTi = Xtime[NewM.id].xp;
                let num = number;
                let levels = Xtime[NewM.id].level;
                let levl = levels * 0.01 + 0.04
                let level = 4 //put ur level here;
                let n = num * (0.01 * level)
                let m = num * (levl)
                Mtime[NewM.id].coins = curTim + m;
                Xtime[NewM.id].xp = curTi + n;
                Vtime[NewM.id].time = curTime + number;
                let curxp = Xtime[NewM.id].xp;
                let curlvl = Xtime[NewM.id].level;
                let nxtLvl = Xtime[NewM.id].level * 1000;
                Xtime[NewM.id].xp = curxp;

                 if(nxtLvl <= Xtime[NewM.id].xp){
                  Xtime[NewM.id].level = curlvl + 1;
}
		//Writing data to a file
                function removeA(arr) {
                    var what, a = arguments, L = a.length, ax;
                    while (L > 1 && arr.length) {
                        what = a[--L];
                        while ((ax= arr.indexOf(what)) !== -1) {
                            arr.splice(ax, 1);
                        }
                    }
                    return arr;
                }

                function removeB(arr) {
                    var what, a = arguments, L = a.length, ax;
                    while (L > 1 && arr.length) {
                        what = a[--L];
                        while ((ax= arr.indexOf(what)) !== -1) {
                            arr.splice(ax, 1);
                        }
                    }
                    return arr;
                }
                function removeC(arr) {
                    var what, a = arguments, L = a.length, ax;
                    while (L > 1 && arr.length) {
                        what = a[--L];
                        while ((ax= arr.indexOf(what)) !== -1) {
                            arr.splice(ax, 1);
                        }
                    }
                    return arr;
                }


                removeA(Voice, NewM);
		//Sending data to a database
		con.query(`SELECT * FROM rcbot WHERE did = "${NewM.id}"`, (err, result, rows, fields) =>{
		let sql;
		console.log(result);
		if(result.length > 0) {
			let time = rows[0].time;
			sql = `UPDATE rcbot SET time = time + '${number - 1}' WHERE did = "${NewM.id}"`
		} else {
			sql = `INSERT INTO rcbot (did, level, time, coins, xp) VALUES ('${NewM.id}', 1, '${number - 1}', 0, 0)`;
		}
		con.query(sql);
		});
                    removeB(Voice, NewM);
					
		con.query(`SELECT * FROM rcbot`, (err, rows, fields) =>{
		let sql;
		let daid = rows[0].did;
		let num = number - 1;
		let n = num * (0.001);
		let xcoins = n;
		
		
		if(NewM.id === NewM.id) {
			let coins = rows[0].coins;
			let level = rows[0].level;
			sql = `UPDATE rcbot SET coins = coins + level * '${xcoins}' WHERE did = "${NewM.id}"`
		} else {
			console.log(error);
		}
		con.query(sql);
		});
		
                    removeC(Voice, NewM);
		con.query(`SELECT * FROM rcbot`, (err, rows, fields) =>{
		let sql;
		let daid = rows[0].did;
		let num = number - 1;
		let n = num * (1);
		let xcoins = n;
		if(NewM.id === NewM.id) {
			let coins = rows[0].xp;
			sql = `UPDATE rcbot SET xp = xp + '${xcoins}' WHERE did = "${NewM.id}"`
		} else {
			console.log(error);
	
		}
		con.query(sql);
		});
            }

            number++;
            setTimeout(function () {
                if (check === 0) {
                    send(number)
                }
            }, 1000);
        }
        send(number);
    }
});

//Automatic ban user
bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;
  if(message.content.includes(" ͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌")){
    message.delete();
    message.member.ban("Spam that may cause the client to freeze.");
  }

  let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
  if(!prefixes[message.guild.id]){
    prefixes[message.guild.id] = {
      prefixes: botconfig.prefix
    };
  }

  if(!coins[message.author.id]){
    coins[message.author.id] = {
      coins: 0
    };
  }



  let prefix = prefixes[message.guild.id].prefixes;
  if(!message.content.startsWith(prefix)) return;
  if(cooldown.has(message.author.id)){
    message.delete();
    return message.reply("Вы должны подождать 5 секунд между командами.")
  }
  if(!message.member.hasPermission("ADMINISTRATOR")){
    cooldown.add(message.author.id);
  }


  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args);

  setTimeout(() => {
    cooldown.delete(message.author.id)
  }, cdseconds * 1000)



});

//Token Connection Error Check
bot.login(token).catch(err=> console.log(err));
