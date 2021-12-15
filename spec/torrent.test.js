const {
  grabTorrents
} = require("../dist/modules/torrent");
const axios = require("axios");

jest.setTimeout(1000000);

describe("Testing torrent module", () => {
  beforeAll(async () => {
    await grabTorrents("Inception"); // Trigger first time cloudflair fail.
  });

  test("1337x can be accessed", async () => {
    const websiteRepsonse = await axios.get("https://1337x.to/");
    expect(websiteRepsonse.status).toBe(200);
  });

  test("Should receive torrent from torrent api", async () => {
    const res = await grabTorrents("Inception");
    expect(Object.keys(res[0])).toStrictEqual([
      "title",
      "time",
      "seeds",
      "peers",
      "size",
      "desc",
      "provider",
      "magnet",
      "number",
    ]); //verifying schema
  });
});