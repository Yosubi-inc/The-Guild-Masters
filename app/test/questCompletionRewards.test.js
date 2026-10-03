import assert from "node:assert/strict";
import test from "node:test";

import { questCompletionRewards } from "../src/questCompletionRewards.js";

test("an assisted quest splits its reward pool with ceiling rounding", () => {
  const rewards = questCompletionRewards(
    {
      rank: "D",
      scrip: 101,
      stats: { STR: 1, DEX: 1 },
    },
    { assisted: true, partySize: 3 },
  );

  assert.deepEqual(rewards, {
    xp: 20,
    scrip: 34,
    statGain: { STR: 1 },
  });
});
