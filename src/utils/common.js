export const getYearRange = () => {
  const years = [];
  const currentYear = new Date().getFullYear();
  for (let i = currentYear - 20; i <= currentYear; i++) {
    years.push(i);
  }
  return years.sort((a, b) => b - a);
};
