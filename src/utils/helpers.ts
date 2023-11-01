export const padNumber = (number: any) => {
  const length = number.toString().length;
  if (length < 4) {
    const zeros = new Array(5 - length).join('0');
    return zeros + number;
  }
  return number;
};