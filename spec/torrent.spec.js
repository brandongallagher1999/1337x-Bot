const {grabTorrents} = require("../dist/modules/torrent");

jest.setTimeout(10000);

test("Testing torrent grabbing", async function() {
    let res = await grabTorrents("Inception"); //first object in response
    
    expect(Object.keys(res[0])).toStrictEqual(["number", "title", "desc", "size", "seeds", "magnet"]); //verifying schema
    expect(res.length).toBe(3); // 3 results

});