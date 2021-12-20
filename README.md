![](https://dcbadge.vercel.app/api/shield/bot/733428046845050982)

![build](https://github.com/brandongallagher1999/1337x-Bot/actions/workflows/ci.yml/badge.svg) ![deployment](https://github.com/brandongallagher1999/1337x-Bot/actions/workflows/azure.yml/badge.svg)

![1337x Logo](https://duckduckgo.com/i/e4d3d1a0.png)

# 1337x Discord Bot

## Description

- Uses 1337x and Discord.JS (NodeJS) to create a bot that allows users to look up content such as Movies, Games and other content and returns them a revelant
  torrent with its respective shortened magnet url, name, seeders and size.

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

# How to run using Docker

## Docker

1. Install Docker (https://docs.docker.com/get-docker/)

## Create Configuration File

1. Go to root folder and:

```sh
TOKEN="your token goes in this string"

echo { '"token"' : '"'$TOKEN'"' } > config.json
```

## Container

1. Go into root folder and run

```
docker-compose build
docker-compose up -d
```

# Example / Usage

![Example](/images/example.jpg?raw=true)
