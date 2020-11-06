/*
Name: Brandon Gallagher
Date: July 16th, 2020
Version: V2.0
Description: NodeJS Discord Bot that uses the 1337x API to grab relevant torrents.
*/

//Config Stuff
const config = require("./config.json");
const token = config.token;


//Discord Stuff
const Discord = require("discord.js");
const client = new Discord.Client();

//Command Prefix
const prefix = ".";

const torrent_module = require("./modules/torrent");
const torrent = require("./modules/torrent");


client.on("ready", () => {
    client.user.setPresence({
        activity : {
            name : "FOR COMMANDS DO: .help\n To star the repo, do .torrent cryptoguys"
        },
        status : "online"
    })
});

client.on("message", (msg) => {
    if (!msg.content.startsWith(prefix) || msg.author.bot) 
    {
        return;
    }
    const args = msg.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();



    let query = "";
    args.map(string=> {
        query += " " + string;
    });

    console.log(`[${Date()}][Username: ${msg.author.username}] used query ${query}`);

    if (command == "torrent")
    {
        if (query == " cryptoguys")
        {
            msg.channel.send(
                new Discord.MessageEmbed()
                    .setTitle("1337x Bot GitHub Repo")
                    .setAuthor("Cryptoguys")
                    .setURL("https://github.com/brandongallagher1999/1337x-Bot")
                    .addFields(
                        {name: "Help out!", value: "Please give the repo a star! :star:"}
                    )
                    .setFooter(Date())
            );
        }
        else
        {
            torrent_module.grabTorrents(query)
            .then(torrentArray => {

                if (torrentArray.length > 0)
                {
                    let torrentList = new Discord.MessageEmbed();
                    torrentList.setAuthor(`@${msg.author.username}`);
                    torrentArray.map((torrent) => {
                        torrentList.addFields(
                            { name : `${torrent.number}. ${torrent.title}`, value : `Seeders: ${torrent.seeds} | Size: ${torrent.size}`}
                        )
                    });
                    msg.channel.send(torrentList); //Send them the list of torrents in the channel

                    const collector = new Discord.MessageCollector(msg.channel, (m) => m.author.id === msg.author.id, { time: 50000 });
                    collector.on('collect', (message) => {
                        const index = parseInt(message)-1;
                        if (index > 0 && index < torrentArray.length)
                        {
                            msg.channel.send(
                                new Discord.MessageEmbed()
                                    .setTitle(torrentArray[index].title)
                                    .setURL(torrentArray[index].desc)
                                    .setAuthor(`@${msg.author.username}`)
                                    .addFields(
                                        { name : "Magnet", value : torrentArray[index].magnet, inline : false},
                                    )
                            );
                            collector.stop();
                        }
                    });
                }
                else
                {
                    msg.channel.send(
                        new Discord.MessageEmbed()
                            .setTitle("Not found")
                            .setAuthor(msg.author.username)
                            .addFields(
                                { name : "Message", value: "Torrent not found in 1337x. Please another query."},
                            )
                            .setFooter(Date())
                    );
                }
                
            });
        }
    }

    if (command == "help")
    {
        msg.channel.send("``` .torrent <torrent name> \n .torrent The Witcher 3 Wild Hunt```");
    }
    
    

});

client.login(token);