/*
Name: Brandon Gallagher
Date: July 16th, 2020
Version: V2.0
Description: NodeJS Discord Bot that uses the 1337x API to grab relevant torrents.
*/

let token: string; //empty login token, initially.

import { Message } from "discord.js";
import { FinalTorrent} from "./modules/types";

const fs = require("fs");
//setting token
if (fs.existsSync("./config.json")) {
    token = JSON.parse(fs.readFileSync("./config.json")).token;
}
else
{
    token = process.argv[2];
}

//Discord Stuff
const Discord = require("discord.js");
const client = new Discord.Client();

//Command Prefix
const prefix = ".";

//Torrent Module
import {grabTorrents} from "./modules/torrent";


//Start-up event
client.on("ready", () => {
    client.user.setPresence({
        activity : {
            name : `.help | .invite | .github | ${client.guilds.cache.size} servers`
        },
        status : "online"
    });

    console.log(`Bot is up and running in ${client.guilds.cache.size} servers!`);
});

// Message in chat event
client.on("message", async (msg: Message) => {
    if (!msg.content.startsWith(prefix) || msg.author.bot) 
    {
        return;
    }
    const args: string[] = msg.content.slice(prefix.length).trim().split(/ +/);
    const command: string = args.shift().toLowerCase();



    let query = "";
    args.map(string => {
        query += " " + string;
    });


    switch(command)
    {
        case "torrent":
            const torrentArray: FinalTorrent[] = await grabTorrents(query);

            if (torrentArray.length > 0)
            {
                let torrentList = new Discord.MessageEmbed();
                torrentList.setAuthor(`@${msg.author.username}`);
                torrentArray.map((torrent: FinalTorrent) => {
                    torrentList.addFields(
                        { name : `${torrent.number}. ${torrent.title}`, value : `${torrent.magnet} | Seeders: ${torrent.seeds} | Size: ${torrent.size}`}
                    )
                });
                msg.channel.send(torrentList); //Send them the list of torrents in the channel

                
            }
            else
            {
                msg.channel.send(
                    new Discord.MessageEmbed()
                        .setTitle("Not found")
                        .setAuthor(msg.author.username)
                        .addFields(
                            { name : "Message", value: "Torrent not found in 1337x. Please try another query."},
                        )
                        .setFooter(Date())
                );
            }
            
            break;

        case "github":
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
            break;
        
        case "help":
            msg.channel.send("``` .torrent <torrent name> //IE: .torrent The Witcher 3 Wild Hunt \n .invite //the invite link to the discord bot```");
            break;

        case "invite":
            msg.channel.send(
                new Discord.MessageEmbed()
                    .setTitle("1337x Bot Invite")
                    .setAuthor(msg.author.username)
                    .setURL("https://discord.com/api/oauth2/authorize?client_id=733428046845050982&permissions=536921088&scope=bot")
            );
            break;
        
    }
    

});

client.login(token);

export {};
