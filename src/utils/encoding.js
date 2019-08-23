import is from 'is_js';

// eslint-disable-next-line import/prefer-default-export
export const sortJsonProperties = (jsonTx) => {
  if (is.array(jsonTx)) {
    return jsonTx.map(sortJsonProperties);
  }

  // string or number
  if (!is.json(jsonTx)) {
    return jsonTx;
  }

  const sorted = {};
  Object.keys(jsonTx)
    .sort()
    .forEach((key) => {
      // if (!jsonTx[key]) return;
      sorted[key] = sortJsonProperties(jsonTx[key]);
    });
  return sorted;
};
