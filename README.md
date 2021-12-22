![1337x Logo](https://duckduckgo.com/i/e4d3d1a0.png)

# Unofficial Discord Bot

![build](https://github.com/brandongallagher1999/1337x-Bot/actions/workflows/ci.yml/badge.svg) ![deployment](https://github.com/brandongallagher1999/1337x-Bot/actions/workflows/azure.yml/badge.svg)

## Description

- Uses 1337x and Discord.JS (NodeJS) to create a Bot that allows users to search for content such as Movies, Games, etc. and returning a relevant
  list of Torrents with their respective shortened magnet URLs, Names, Seeders and File Sizes.

# Commands

```
// To find a torrent
.torrent <query>

// For a list of commands
.help

// To invite the Bot elsewhere
.invite

// Get the GitHub link to the project
.github
```

# How to run using Docker

## Pre-Requisites

- Install Docker [**here**](https://docs.docker.com/get-docker/)

## Clone repository

- Clone the project by running:

```
git clone https://github.com/brandongallagher1999/1337x-Bot/
```

## Create Configuration File

- Go to root folder and:

```sh
TOKEN="your bot token goes in this string"

echo { '"token"' : '"'$TOKEN'"' } > config.json
```

## Container

- Go into root folder and run

```
docker-compose build
docker-compose up -d
```

# Example / Usage

![Image of the Bot Working](/images/example.jpg?raw=true)
