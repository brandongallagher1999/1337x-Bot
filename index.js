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


client.on("ready", () => {
    client.user.setPresence({
        activity : {
            name : "FOR COMMANDS DO: .help"
        },
        status : "online"
    })
});

client.on("message", msg => {
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
            torrent_module.grabTorrent(query)
            .then(torrentObj => {
                if (torrentObj.status == "okay")
                {
                    msg.channel.send(
                        new Discord.MessageEmbed()
                            .setTitle(torrentObj.torrent.title)
                            .setURL(torrentObj.torrent.desc)
                            .setAuthor(msg.author.username)
                            .addFields(
                                //{ name : "Name", value: torrentObj.torrent.title, inline: false},
                                { name : "Magnet", value : torrentObj.magnet, inline : false},
                                { name : "Seeders", value : torrentObj.torrent.seeds, inline: false},
                                { name: "Size", value : torrentObj.torrent.size, inline: false}
                            )
                            .setFooter(Date())
                    );
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