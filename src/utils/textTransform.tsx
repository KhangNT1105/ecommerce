export const upperCaseFirst = (str: String = '') => {
  return str.toLowerCase().replace(/^\w/, (chars) => chars.toUpperCase());
};
