import { FinalTorrent } from "./types";

//1337x Torrent API
const torrentApi = require("torrent-search-api");
torrentApi.enableProvider("1337x");



const urlencode = require("urlencode");
const fetch = require("node-fetch");

/*

    Returns a list of up to 5 torrent objects with their relevant properties.

    @param {string} torrent The query made from the user

*/
const grabTorrents = async (torrent: string)=>
{
    try
    {
        console.log("final torrent is:");
        let tempArr: FinalTorrent[] = []; // length 3 of type <torrent>
        let torrentArray: FinalTorrent[] = []; // serializing the <torrent> objects into array of objects

        await torrentApi.search(torrent)
            .then((e: FinalTorrent[]) => { //e is an array of type <torrent>
                
                for (let i = 0; i < 3; i++)
                {
                    if (!(typeof e[i] === "undefined"))
                    {
                        tempArr.push(e[i]);
                    }
                    
                }
                //torrentObj = e[0]; //First object in the array of torrents
            });
        
        

        for (let i = 0; i < tempArr.length; i++)
        {
            await torrentApi.getMagnet(tempArr[i])
            .then((obj: string) => {
                torrentArray.push({
                    number : i+1,
                    title : tempArr[i].title,
                    desc : tempArr[i].desc,
                    size : tempArr[i].size,
                    seeds : tempArr[i].seeds,
                    magnet : obj
                });
            });
        }

        for (let i = 0; i < torrentArray.length; i++)
        {
            await shorten(torrentArray[i].magnet)
            .then(obj =>{
                torrentArray[i].magnet = obj;
            });
        }
        return torrentArray;
        
    } 
    catch (error) {
        return {
            "status" : "not found"
        }
    }
    
}

const shorten = async (magnet: string) =>
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
          .then((res: Body) => {
              return res.text();
          })
          .then((data: string) => {
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
    grabTorrents
}