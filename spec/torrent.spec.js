const {grabTorrents} = require("../dist/modules/torrent");

jest.setTimeout(1000000);

const runTest = async () => {
    let res = await grabTorrents("Inception"); //first object in response
    console.log(res);
    expect(Object.keys(res[0])).toStrictEqual(["title", "time", "seeds", "peers", "size", "desc", "provider", "magnet", "number"]); //verifying schema
    expect(res.length).toBe(3); // 3 results
}

test("Testing torrent grabbing", async () => {
    try
    {
        await runTest();
    } catch (err)
    {
        console.log(err);
        await runTest(); // Why am I calling this function again? Because the first grabTorrents() always fails due to some silly CloudFlare error.
    }
});

