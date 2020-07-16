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
const prefix = "?";

//1337x Torrent API
const torrentApi = require("torrent-search-api");
torrentApi.enableProvider("1337x");


client.on("message", msg => {
    if (!msg.content.startsWith(prefix) || msg.author.bot) return;

    const args = msg.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    let query = "";
    args.map(string=> {
        query += " " + string;
    });

    if (command == "torrent")
    {
        grabTorrent(query)
        .then(torrentObj => {
            msg.channel.send(
                new Discord.MessageEmbed()
                    .setTitle(query)
                    .setURL(torrentObj.torrent.desc)
                    .setAuthor("1337x Bot")
                    .addFields(
                        { name : "Name", value: torrentObj.torrent.title, inline: false},
                        { name : "Magnet", value : torrentObj.magnet, inline : false},
                        { name : "Seeders", value : torrentObj.torrent.seeds, inline: false},
                        { name: "Size", value : torrentObj.torrent.size, inline: false}
                    )
                    .setFooter(Date())
            )
        });
        
        
    }
    else if (command == "help")
    {
        msg.channel.send("``` ?torrent <torrent name> ```");
    }

});

async function grabTorrent(torrent)
{
    let torrentObj;
    let magnet;

    await torrentApi.search(torrent)
        .then(e => {
            torrentObj = e[0]; //First object in the array of torrents
        });
    
    magnet = await torrentApi.getMagnet(torrentObj);
    return {"torrent" : torrentObj, "magnet" : magnet};
}

client.login(token);

