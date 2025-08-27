export const once = (func) => {
  let result;
  let executed = false;
  return (...args) => {
    if (!executed) {
      result = func(...args);
      executed = true;
    }
    return result;
  };
};
