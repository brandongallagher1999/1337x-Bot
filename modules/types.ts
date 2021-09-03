import { Torrent } from "torrent-search-api";

export interface FinalTorrent extends Torrent {
  number?: number;
  seeds?: number;
}
