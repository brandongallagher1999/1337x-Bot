const {grabTorrents} = require("../dist/modules/torrent");

jest.setTimeout(1000000);

test("Testing torrent grabbing", async function() {

    let dummyObject = await grabTorrents("Inception");
    let res = await grabTorrents("Inception"); //first object in response
    console.log(res);
    expect(Object.keys(res[0])).toStrictEqual(["title", "time", "seeds", "peers", "size", "desc", "provider", "magnet", "number"]); //verifying schema
    expect(res.length).toBe(3); // 3 results

});