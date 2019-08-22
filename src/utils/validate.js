import objectPath from 'object-path';

export const checkParams = (requiredParams = [], data = {}) => {
  requiredParams.forEach((param) => {
    if (!objectPath.has(data, param)) throw new Error(`\'${param}\' field is required`);
  });
  return true;
};
