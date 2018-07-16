const botconfig = require("./botconfig.json");
const tokenfile = require("./token.json");
const Discord = require("discord.js");
const token = process.env.token;
const fs = require("fs");
const bot = new Discord.Client();
let Voice = [];
bot.commands = new Discord.Collection();
let coins = require("./coins.json");
let warn = require("./warnings.json");
let Vtime = require("./VoiceTime.json");
let Mtime = require("./coins.json");
let Xtime = require("./xp.json");
let purple = botconfig.purple;
let cooldown = new Set();
let cdseconds = 5;


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

bot.on("ready", async () => {

  console.log(`${bot.user.username} is online on ${bot.guilds.size} servers!`);
  bot.user.setActivity("за хорошими людьми) (Prefix `!` для бота)", {type: "WATCHING"});

});


bot.on("voiceStateUpdate", (OldM, NewM, message)=> {

    console.log(Voice);

    if(Voice.find(m => m.id === NewM.id)){
        return;
    }

    if(NewM.voiceChannel){
        let number = 0;
        Voice.push(NewM);

        function send(number) {
            console.log(number, NewM.id);

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

             //    let lvlup = new Discord.RichEmbed()
             //     .setTitle(`${NewM.username} Level Up! `)
              //    .setColor("#e60000")
              //    .addField("Новый уровень!", curlvl + 1);







               //    message.channel.send(lvlup).then(msg => {msg.delete(5000)});
               //  }
               // fs.writeFile("./xp.json", JSON.stringify(Xtime), (err) => {
               //   if(err) console.log(err)
               // });




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

                fs.writeFile("./VoiceTime.json", JSON.stringify(Vtime),err => {
                    if(err) throw err;
                });

                    removeB(Voice, NewM);

                fs.writeFile("./coins.json", JSON.stringify(Mtime),err => {
                    if(err) throw err;
                });

                    removeC(Voice, NewM);

                fs.writeFile("./xp.json", JSON.stringify(Xtime),err => {
                    if(err) throw err;
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

bot.on("message", async message => {




  if(message.author.bot) return;
  if(message.channel.type === "dm") return;
  if(message.content.includes(" ͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌⃢͌͌͌")){
    message.delete();
    message.member.ban("Пидор пытался положить сервер, у него это не получилось :c .");
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

bot.login(token).catch(err=> console.log(err));
