![build](https://github.com/brandongallagher1999/1337x-Bot/actions/workflows/ci.yml/badge.svg) ![deployment](https://github.com/brandongallagher1999/1337x-Bot/actions/workflows/azure.yml/badge.svg)

![1337x Logo](https://img.ibxk.com.br/2015/07/22/22123545851313.jpg)

## Github project URL
https://github.com/brandongallagher1999/1337x-Bot/

## Discord Bot Invite Link
[Invite Link](https://discord.com/api/oauth2/authorize?client_id=733428046845050982&permissions=536921088&scope=bot)

## Contributors
1. **Brandon Gallagher**
  - Roles: Back-end
  - Email: brandonegallagher@gmail.com
  - [Github Profile](https://github.com/brandongallagher1999)

## Description
- Uses 1337x and Discord.JS (NodeJS) to create a bot that allows users to look up content such as Movies, Games and other things and returns them a revelant
torrent with its respective magnet, name and image.

# How to run
## Docker
1. Download Docker for Desktop (https://www.docker.com/products/docker-desktop)

## Create Configuration File
1. Go to root folder and create "config.json"
```
{
  "token" : "your token goes in this string"
}
```

## Container
1. Go into root folder and run
```
docker-compose build
docker-compose up -d
```
  
# Commands

```
// To find a torrent
.torrent <query>

// For help
.help

// To invite
.invite

// To get the GitHub link
.github
```
