import {WebStorageUtility} from '../utility/web-storage.utility';

export function LocalStorage(key?: string) {
  return WebStorage(localStorage, key);
}

export function SessionStorage(key?: string) {
  return WebStorage(sessionStorage, key);
}

/**
 * Main Decorator function for handling either Session or Local Storage
 * Decorator invokes WebStorageService using root Injector
 * *** WARNING: this could lead to performance issues if properties are directly bound to templates due to angular Detection changes ***
 * @param {Storage} webStorage - Session or Local
 * @param {string} key
 * @returns {(target: Object, propertyName: string) => void}
 * @constructor
 */
export let WebStorage = (webStorage: Storage, key: string) => {
  return (target: Object, propertyName: string): void => {
    key = key || `${target.constructor.name}_${propertyName}`;

    const storedValue = WebStorageUtility.get(webStorage, key);

    const cache = {};

    Object.defineProperty(target, propertyName, {
      get: function () {
        return WebStorageUtility.get(webStorage, key);
      },
      set: function (value: any) {
        if (!cache[key]) {
          if (storedValue === null) {
            WebStorageUtility.set(webStorage, key, value);
          }
          cache[key] = true;
          return;
        }
        WebStorageUtility.set(webStorage, key, value);
      },
    });

  };
};
