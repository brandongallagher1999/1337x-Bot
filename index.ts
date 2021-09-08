import { Message, Intents, MessageEmbed, Client } from "discord.js";
import { FinalTorrent } from "./modules/types";
import * as fs from "fs";
import { grabTorrents } from "./modules/torrent";

const client: Client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

let token: string; //empty login token, initially.

//Command Prefix
const prefix = ".";

//setting token
if (fs.existsSync("./config.json")) {
  token = JSON.parse(fs.readFileSync("./config.json").toString()).token;
} else {
  token = process.argv[2];
}

//Start-up event
client.on("ready", () => {
  client.user.setPresence({
    activities: [
      {
        name: `.help | .invite | .github | ${client.guilds.cache.size} servers`,
      },
    ],
    status: "online",
  });

  console.log(`Bot is up and running in ${client.guilds.cache.size} servers!`);
});

// Message in chat event
client.on("messageCreate", async (msg: Message) => {
  if (!msg.content.startsWith(prefix) || msg.author.bot) {
    return;
  }
  const args: string[] = msg.content.slice(prefix.length).trim().split(/ +/);
  const command: string = args.shift().toLowerCase();

  let query = "";
  args.map((string) => {
    query += " " + string;
  });

  switch (command) {
    case "torrent":
      const torrentArray: FinalTorrent[] = await grabTorrents(query);

      if (torrentArray.length > 0) {
        let torrentList: MessageEmbed = new MessageEmbed();
        torrentList.setAuthor(`@${msg.author.username}`);
        torrentArray.map((torrent: FinalTorrent) => {
          torrentList.addFields({
            name: `${torrent.number}. ${torrent.title}`,
            value: `${torrent.magnet} | Seeders: ${torrent.seeds} | Size: ${torrent.size}`,
          });
        });
        msg.channel.send({ embeds: [torrentList] }); //Send them the list of torrents in the channel
      } else {
        msg.channel.send({
          embeds: [
            new MessageEmbed()
              .setTitle("Not found")
              .setAuthor(msg.author.username)
              .addFields({
                name: "Message",
                value: "Torrent not found in 1337x. Please try another query.",
              })
              .setFooter(Date()),
          ],
        });
      }

      break;

    case "github":
      msg.channel.send({
        embeds: [
          new MessageEmbed()
            .setTitle("1337x Bot GitHub Repo")
            .setAuthor("Cryptoguys")
            .setURL("https://github.com/brandongallagher1999/1337x-Bot")
            .addFields({
              name: "Help out!",
              value: "Please give the repo a star! :star:",
            })
        ],
      });
      break;

    case "help":
      msg.channel.send(
        "``` .torrent <torrent name> //IE: .torrent The Witcher 3 Wild Hunt \n .invite //the invite link to the discord bot```"
      );
      break;

    case "invite":
      msg.channel.send({
        embeds: [
          new MessageEmbed()
            .setTitle("1337x Bot Invite")
            .setAuthor(msg.author.username)
            .setURL(
              "https://discord.com/api/oauth2/authorize?client_id=733428046845050982&permissions=536921088&scope=bot"
            ),
        ],
      });
      break;
  }
});

grabTorrents("Get rid of cloudflare error pls"); //initial query allows us to query from the bot without cloudflare exception

client.login(token);

export {};
