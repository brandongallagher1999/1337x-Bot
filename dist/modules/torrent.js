"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
//1337x Torrent API
const torrentApi = require("torrent-search-api");
torrentApi.enableProvider("1337x");
const urlencode = require("urlencode");
const fetch = require("node-fetch");
/*

    Returns a list of up to 5 torrent objects with their relevant properties.

    @param {string} torrent The query made from the user

*/
const grabTorrents = (torrent) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let tempArr = []; // length 3 of type <torrent>
        let torrentArray = []; // serializing the <torrent> objects into array of objects
        yield torrentApi.search(torrent)
            .then((e) => {
            for (let i = 0; i < 3; i++) {
                if (!(typeof e[i] === "undefined")) {
                    tempArr.push(e[i]);
                }
            }
            //torrentObj = e[0]; //First object in the array of torrents
        });
        for (let i = 0; i < tempArr.length; i++) {
            yield torrentApi.getMagnet(tempArr[i])
                .then((obj) => {
                torrentArray.push({
                    number: i + 1,
                    title: tempArr[i].title,
                    desc: tempArr[i].desc,
                    size: tempArr[i].size,
                    seeds: tempArr[i].seeds,
                    magnet: obj
                });
            });
        }
        for (let i = 0; i < torrentArray.length; i++) {
            yield shorten(torrentArray[i].magnet)
                .then(obj => {
                torrentArray[i].magnet = obj;
            });
        }
        return torrentArray;
    }
    catch (error) {
        return {
            "status": "not found"
        };
    }
});
const shorten = (magnet) => __awaiter(void 0, void 0, void 0, function* () {
    let shortened;
    try {
        let encoded = urlencode(magnet);
        let query = yield fetch(`http://mgnet.me/api/create?&format=json&opt=&m=${encoded}&_=1595006240839`, {
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
            .then((res) => {
            return res.text();
        })
            .then((data) => {
            let obj = JSON.parse(data);
            shortened = obj.shorturl;
        });
        return yield Promise.resolve(shortened);
    }
    catch (err) {
        throw err;
    }
});
module.exports = {
    shorten,
    grabTorrents
};
