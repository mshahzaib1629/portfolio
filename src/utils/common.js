import K from "./constants";

export const getYearRange = () => {
  const years = [];
  const currentYear = new Date().getFullYear();
  for (let i = currentYear - 20; i <= currentYear; i++) {
    years.push(i);
  }
  return years.sort((a, b) => b - a);
};

export const convertStringToArray = (string) => {
  if (typeof string === "string") {
    const arr = string.split(",");
    return arr.map((arrItem) => arrItem.trim());
  } else return [];
};

export const convertArrayToString = (array) => {
  if (Array.isArray(array))
    return array.reduce((pValue, cValue, cIndex, ar) => `${pValue}, ${cValue}`);
  else return "";
};

export const getMonthWrtMonthArray = (objIndex) => {
  return K.app.months.filter((m) => m.index === objIndex)[0];
};
