import is from 'is_js';

export function sortJsonProperties (jsonTx) {
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
}
