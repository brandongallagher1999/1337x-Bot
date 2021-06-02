import { FinalTorrent } from "./types";

//1337x Torrent API
const torrentApi = require("torrent-search-api");
torrentApi.enableProvider("1337x");



const urlencode = require("urlencode");
const fetch = require("node-fetch");
import axios from "axios";

/*

    Returns a list of up to 5 torrent objects with their relevant properties.

    @param {string} torrent The query made from the user

*/
const grabTorrents = async (torrent: string) =>
{
    try
    {
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
            .then((obj: string) =>{
                torrentArray[i].magnet = obj;
            });
        }
        return torrentArray;
        
    } 
    catch (error) {
        console.log(error);
        return [];
    }
    
}

const shorten = async (magnet: string) =>
{
    try
    {
        let encoded = urlencode(magnet);
        const resp = await axios.get(`http://mgnet.me/api/create?&format=json&opt=&m=${encoded}`);
        const data = await resp.data;
        return data.shorturl;
        
    }
    catch(err)
    {
        console.log(err);
    }

    
}

export {
    shorten,
    grabTorrents
}