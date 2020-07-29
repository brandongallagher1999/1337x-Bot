/*
Name: Brandon Gallagher
Date: July 16th, 2020
Version: V2.0
Description: NodeJS Discord Bot that uses the 1337x API to grab relevant torrents.
*/

//Config Stuff
const config = require("./config.json");
const token = config.token;
let urlencode = require("urlencode");
let fetch = require("node-fetch");

//Discord Stuff
const Discord = require("discord.js");
const client = new Discord.Client();

//Command Prefix
const prefix = ".";

//1337x Torrent API
const torrentApi = require("torrent-search-api");
torrentApi.enableProvider("1337x");


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
            console.log(`|${query}|`);
            grabTorrent(query)
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

const grabTorrent = async (torrent)=>
{
    try
    {
        let torrentObj;
        let magnet;
        let shortened;

        await torrentApi.search(torrent)
            .then(e => {
                torrentObj = e[0]; //First object in the array of torrents
            });
        
        await torrentApi.getMagnet(torrentObj)
            .then(mag => magnet = mag);

        await shorten(magnet)
            .then(short => shortened = short);

        return {
            "status" : "okay",
            "torrent" : torrentObj, 
            "magnet" : shortened,
        };
    } 
    catch (error) {
        return {
            "status" : "not found"
        }
    }
    
}

client.login(token);


async function shorten(magnet)
{
    let shortened;
    try
    {
        let encoded = urlencode(magnet);
        let query = await fetch(`http://mgnet.me/api/create?&format=json&opt=&m=${encoded}&_=1595006240839`, {
            "headers": {
              "accept": "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript, */*; q=0.01",
              "accept-language": "en-US,en;q=0.9",
              "x-requested-with": "XMLHttpRequest",
              "cookie": "NSHcookie=20111006b0a72d26c6f0003"
            },
            "referrer": "http://mgnet.me/",
            "referrerPolicy": "no-referrer-when-downgrade",
            "body": null,
            "method": "GET",
            "mode": "cors"
          })
          .then(res => {
              return res.text();
          })
          .then(data => {
              let obj = JSON.parse(data);
              shortened = obj.shorturl;
          });

        return await Promise.resolve(shortened);
    }
    catch(err)
    {
        throw err;
    }

    
}