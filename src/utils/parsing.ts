const LIMIT_TOTAL_WORD_LENGTH = 25;
const LIMIT_NOT_ABBREVIATE_LENGTH = 20;

export const identifyAbbreviationBadge = (badges: string[]) => {
  const totalWordLength = badges.reduce((acc, cur) => acc + cur.length, 0);

  if (totalWordLength < LIMIT_TOTAL_WORD_LENGTH) return badges;

  const firstLength = !!badges[0] ? badges[0].length : 0;
  const secondLength = !!badges[1] ? badges[1].length : 0;
  const thirdLength = !!badges[2] ? badges[2].length : 0;
  const fourthLength = !!badges[3] ? badges[3].length : 0;
  const fifthLength = !!badges[4] ? badges[4].length : 0;

  if (firstLength > LIMIT_NOT_ABBREVIATE_LENGTH) return [badges[0], `+ ${badges.length - 1}`];
  if (firstLength + secondLength > LIMIT_NOT_ABBREVIATE_LENGTH) return [badges[0], badges[1], `+ ${badges.length - 2}`];
  if (firstLength + secondLength + thirdLength > LIMIT_NOT_ABBREVIATE_LENGTH) {
    return [badges[0], badges[1], badges[2], `+ ${badges.length - 3}`];
  }
  if (
    firstLength + secondLength + thirdLength + fourthLength > LIMIT_NOT_ABBREVIATE_LENGTH ||
    firstLength + secondLength + thirdLength + fourthLength + fifthLength > LIMIT_NOT_ABBREVIATE_LENGTH
  ) {
    return [badges[0], badges[1], badges[2], badges[3], `+ ${badges.length - 4}`];
  }

  return [badges[0], badges[1], badges[2], badges[3], badges[4], `+ ${badges.length - 5}`];
};
