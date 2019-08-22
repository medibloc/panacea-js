export const checkParams = (requiredParams = [], data = {}) => {
  requiredParams.forEach((param) => {
    if (!data[param]) throw new Error(`\'${param}\' field is required`);
  });
  return true;
};
