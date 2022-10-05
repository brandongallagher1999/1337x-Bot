![1337x Logo](https://duckduckgo.com/i/e4d3d1a0.png)

# Unofficial Discord Bot

![build](https://github.com/brandongallagher1999/1337x-Bot/actions/workflows/ci.yaml/badge.svg) 

## Description

- Uses 1337x and Discord.JS (NodeJS) to create a Bot that allows users to search for content such as Movies, Games, etc. and returning a relevant
  list of Torrents with their respective shortened magnet URLs, Names, Seeders and File Sizes.
  
## NEW REPO!!
- MIGRATED TO https://github.com/brandongallagher1999/1337x-Bot-Go

# Commands

```
// Search for a list of Torrents
.torrent <query>

// Display all available commands
.help

// Get the GitHub link to this project
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
