export const levelUp = (userLevel: number, userExp: number) => {
  if (userExp >= 5) {
    userExp = 0;
    return (userLevel += 1);
  } else {
    return (userLevel = userLevel);
  }
};
