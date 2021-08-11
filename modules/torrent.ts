import { FinalTorrent } from "./types";

//1337x Torrent API
//@ts-ignore
const torrentApi = require("torrent-search-api");
torrentApi.enableProvider("1337x");

//@ts-ignore
const urlencode = require("urlencode");
//@ts-ignore
const fetch = require("node-fetch");
import axios from "axios";


/**
 * @description Searches 1337x for the torrent given a query string.
 * @param {string} torrent The torrent query string
 * @returns {Promise<FinalTorrent[]>} An array of the FinalTorrent interface type.
 */
const grabTorrents = async (torrent: string): Promise<FinalTorrent[]> =>
{
    try
    {
        let torrents: FinalTorrent[] = await torrentApi.search(torrent);
        let finalTorrents: FinalTorrent[] = [];

        for (let i = 0; i < 3; i++)
        {
            if (torrents[i] != null)
            {
                finalTorrents.push(torrents[i]);
            }
        }

        for (let i = 0; i < finalTorrents.length; i++)
        {
            const longMagnet = await torrentApi.getMagnet(finalTorrents[i]);
            finalTorrents[i].magnet = await shorten(longMagnet);
            finalTorrents[i].number = i + 1;
        }

        return finalTorrents;
        
    } 
    catch (error: any) {
        console.log(error);
        return [];
    }
    
}

/**
 * @description Shortens the given magnet string into a URL, using the mgnet.me REST api
 * @param {string} magnet
 * @returns {Promise<string>} shorturl string
 */
const shorten = async (magnet: string): Promise<string> =>
{
    try
    {
        let encoded = urlencode(magnet);
        const resp = await axios.get(`http://mgnet.me/api/create?&format=json&opt=&m=${encoded}`);
        return resp.data.shorturl;
    }
    catch(err)
    {
        console.log(err);
    }
}

export {
    shorten,
    grabTorrents
};