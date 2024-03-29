import { grabTorrents } from "../modules/torrent";
import { FinalTorrent } from "../modules/types";

jest.setTimeout(1000000);

const runTest = async (): Promise<void> => {
  console.time();
  let res: FinalTorrent[] = await grabTorrents("Inception"); //first object in response
  console.log(res);
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
  console.timeEnd();
};

describe("Testing torrent module", () => {
  test("Should receive torrent from torrent api", async () => {
    try {
      await runTest();
    } catch (err) {
      console.log(err);
      await runTest(); // Why am I calling this function again? Because the first grabTorrents() always fails due to some silly CloudFlare error.
    }
  });
});
