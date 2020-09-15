export const sortJsonProperties = (jsonTx: any): any => {
  if (Array.isArray(jsonTx)) {
    return jsonTx.map(sortJsonProperties);
  }

  // string or number
  if (typeof jsonTx !== `object`) {
    if (typeof jsonTx === `number`) {
      return jsonTx.toString()
    }
    return jsonTx;
  }

  const sorted: any = {};
  Object.keys(jsonTx)
    .sort()
    .forEach((key) => {
      if (jsonTx[key] == undefined || jsonTx[key] === null) {
        return;
      }
      sorted[key] = sortJsonProperties(jsonTx[key]);
    });
  return sorted;
};
