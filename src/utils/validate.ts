const objectPath = require('object-path');

// TODO @youngjoon-lee: to be deleted, after making all classes type-safe
export const checkParams = (requiredParams: string[] = [], data: Record<string, any> = {}): boolean => {
  requiredParams.forEach((param) => {
    if (!objectPath.has(data, param)) throw new Error(`'${param}' field is required`);
  });
  return true;
};
