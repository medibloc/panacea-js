import is from "is_js";

export const sortJsonProperties = (jsonTx: any): any => {
  if (is.array(jsonTx)) {
    return jsonTx.map(sortJsonProperties);
  }

  // string or number
  if (!is.json(jsonTx)) {
    return jsonTx;
  }

  const sorted: any = {};
  Object.keys(jsonTx)
    .sort()
    .forEach((key) => {
      // if (!jsonTx[key]) return;
      sorted[key] = sortJsonProperties(jsonTx[key]);
    });
  return sorted;
};
