export const capitalString = (str: string): string => {
  const arr: string[] = str.split(" ");
  const capitalizedSentence = arr
    .map((word) => {
      if (!word.includes(".")) {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      } else {
        return word.toUpperCase();
      }
    })
    .join(" ");
  return capitalizedSentence;
};
