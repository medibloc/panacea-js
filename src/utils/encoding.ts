import is from "is_js";
import {classToPlain} from "class-transformer";

/**
 * Returns a plain object which contains properties sorted by their key (name).
 * Properties are transformed to the plain object, if they are class objects.
 *
 * @param jsonTx - Anything (class object, plain object, primitive values, ...)
 * @returns The sorted plain object
 */
export const sortJsonProperties = (jsonTx: any): any => {
  // Converts the class object to the plain object.
  // If jsonTx is not a class object, classToPlain does nothing.
  const plain = classToPlain(jsonTx)

  if (is.array(plain)) {
    return jsonTx.map(sortJsonProperties);
  }

  // string or number
  if (!is.json(plain)) {
    return jsonTx;
  }

  const sorted: any = {};
  Object.keys(plain)
    .sort()
    .forEach((key: string) => {
      // if (!jsonTx[key]) return;
      sorted[key] = sortJsonProperties(plain[key]);
    });
  return sorted;
};

