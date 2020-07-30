//1337x Torrent API
const torrentApi = require("torrent-search-api");
torrentApi.enableProvider("1337x");

const urlencode = require("urlencode");
const fetch = require("node-fetch");

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

const shorten = async (magnet) =>
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

module.exports = {
    shorten,
    grabTorrent
}