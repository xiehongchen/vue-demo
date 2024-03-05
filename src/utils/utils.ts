const isArray = Array.isArray;
const isMap = (val: any) => toTypeString(val) === "[object Map]";
const isSet = (val: any) => toTypeString(val) === "[object Set]";
const isDate = (val: any) => toTypeString(val) === "[object Date]";
const isRegExp = (val: any) => toTypeString(val) === "[object RegExp]";
const isFunction = (val: any) => typeof val === "function";
const isString = (val: any) => typeof val === "string";
const isSymbol = (val: any) => typeof val === "symbol";
const isObject = (val: any) => val !== null && typeof val === "object";
const isPromise = (val: any) => {
  return (isObject(val) || isFunction(val)) && isFunction(val.then) && isFunction(val.catch);
};
const objectToString = Object.prototype.toString;
const toTypeString = (value: any) => objectToString.call(value);


export {
  isArray,
  isMap,
  isSet,
  isDate,
  isRegExp,
  isFunction,
  isString,
  isSymbol,
  isObject,
  isPromise,
  toTypeString,
};