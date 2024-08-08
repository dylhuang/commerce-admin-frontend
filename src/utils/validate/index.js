export function isPassword(str) {
    return str.length >= 6;
}
// 大于0，且最多两位小数
export function isPrice(str) {
    return /^0\.([1-9]|\d[1-9])$|^[1-9]\d*\.\d{0,2}$|^[1-9]\d*$/.test(str);
}

// 大于0，且最多四位小数
// export function isUpPrice(str) {
//   return /^0\.([1-9]|\d[1-9])$|^[1-9]\d*\.\d{0,4}$|^[1-9]\d*$/.test(str);
// }

// 大于0 小于等于100 最多两位小数
export function floatUpAll(str) {
  return /^\d\.([1-9]{1,2}|[0-9][1-9])$|^[1-9]\d{0,1}(\.\d{1,2}){0,1}$|^100(\.0{1,2}){0,1}$/.test(str);
}

// 大于等于0 小于等于100 最多两位小数
export function isPriceAll(str) {
    return /^(100(\.00)?|[0-9]{1,2}(\.[0-9]{1,2})?)$/.test(str);
}

// 大于等于0 最多两位小数
export function floatUpZore(str) {
    return /^(?:\d+|\d+\.\d{1,2})$/.test(str);
}

// 大于0的正整数
export function integerUpZore(str) {
    return /^[1-9]\d*$/.test(str);
}

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
    return /^(https?:|mailto:|tel:)/.test(path);
}

