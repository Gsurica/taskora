export const expProvider = (userlevel: number) => {
  if (userlevel <= 1) {
    return userlevel * 2;
  }

  return Math.ceil(userlevel / 2);
};
