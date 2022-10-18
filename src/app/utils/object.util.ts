/**
 * Copy Matching properties from Source to Target
 * @param target Object of type Any
 * @param source Object of type Any
 */
function copyMatchingKeyValues(target: any, source: any) {
  return Object.keys(target).forEach(key => {
    if (source[key] !== undefined) {
      if (typeof source[key] === 'string' || source[key] instanceof String) {
        target[key] = source[key].trim();
      } else {
        target[key] = source[key];
      }
    }
  });
}

export {copyMatchingKeyValues};
