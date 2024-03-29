import { FinalTorrent } from "./types";
import axios, { AxiosResponse } from "axios";
const urlencode = require("urlencode");
const torrentApi = require("torrent-search-api");
torrentApi.enableProvider("1337x");

/**
 * @description Searches 1337x for the torrent given a query string.
 * @param torrent The torrent query string
 * @returns An array of the FinalTorrent interface type.
 */
const grabTorrents = async (torrent: string): Promise<FinalTorrent[]> => {
  try {
    let torrents: FinalTorrent[] = await torrentApi.search(torrent);
    let finalTorrents: FinalTorrent[] = [];

    for (let i = 0; i < 10; i++) {
      if (torrents[i] != null) {
        finalTorrents.push(torrents[i]);
      }
    }

    for (let i = 0; i < finalTorrents.length; i++) {
      const longMagnet: string = await torrentApi.getMagnet(finalTorrents[i]);
      finalTorrents[i].magnet = await shorten(longMagnet);
      finalTorrents[i].number = i + 1;
    }

    return finalTorrents;
  } catch (error: any) {
    console.log(error);
    return [];
  }
};

/**
 * @description Shortens the given magnet string into a URL, using the mgnet.me REST api
 * @param magnet Magnet String
 * @returns shorturl string
 */
const shorten = async (magnet: string): Promise<string> => {
  try {
    let encoded = urlencode(magnet);
    const resp: AxiosResponse = await axios.get(
      `http://mgnet.me/api/create?&format=json&opt=&m=${encoded}`
    );
    return resp.data.shorturl;
  } catch (err) {
    console.log(err);
  }
};

export { shorten, grabTorrents };
