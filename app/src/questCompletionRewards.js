import { XP_PER_RANK } from "./constants.js";

export function questCompletionRewards(quest, { assisted, partySize }) {
  const divisor = assisted ? partySize : 1;
  const divide = (value) => (assisted ? Math.ceil(value / divisor) : value);
  const statKeys = Object.keys(quest.stats);
  const statPoints = divide(
    Object.values(quest.stats).reduce((total, value) => total + value, 0),
  );
  const statGain = {};

  for (let index = 0; index < statPoints; index += 1) {
    const stat = statKeys[index % statKeys.length];
    statGain[stat] = (statGain[stat] || 0) + 1;
  }

  return {
    xp: divide(XP_PER_RANK[quest.rank]),
    scrip: divide(quest.scrip),
    statGain,
  };
}
