const KEY_PREFIX = 'RDS';

export class WebStorageUtility {

  static inMemoryStorage = {};

  static generateStorageKey(key: string): string {
    return `${KEY_PREFIX}_${key}`;
  }

  static get(storage: Storage, key: string): any {
    const storageKey = WebStorageUtility.generateStorageKey(key);
    const cacheValue = WebStorageUtility.inMemoryStorage[storageKey];
    if (cacheValue) {
      return cacheValue;
    }

    if (WebStorageUtility.isSupported(storage)) {
      const value = storage.getItem(storageKey);
      return WebStorageUtility.getGettable(value);
    }
  }

  static set(storage: Storage, key: string, value: any): void {
    const storageKey = WebStorageUtility.generateStorageKey(key);
    WebStorageUtility.inMemoryStorage[storageKey] = value;

    if (WebStorageUtility.isSupported(storage)) {
      storage.setItem(storageKey, WebStorageUtility.getSettable(value));
    }
  }

  static remove(storage: Storage, key: string): void {
    const storageKey = WebStorageUtility.generateStorageKey(key);

    delete WebStorageUtility.inMemoryStorage[storageKey];

    if (WebStorageUtility.isSupported(storage)) {
      storage.removeItem(storageKey);
    }
  }

  static clean(storage: Storage, group: string) {
    const arr = []; // Array to hold the keys
    // Iterate over localStorage and insert the keys that meet the condition into arr
    for (let i = 0; i < storage.length; i++) {
      if (storage.key(i).indexOf(group) >= 0) {
        arr.push(storage.key(i));
      }
    }

    // Iterate over arr and remove the items by key
    for (let i = 0; i < arr.length; i++) {
      storage.removeItem(arr[i]);
    }
  }

  static isSupported(storage: Storage) {
    try {
      const key = '__some_key_not_used__';
      storage.setItem(key, key);
      storage.removeItem(key);
      return true;
    } catch (e) {
      return false;
    }
  }

  private static getSettable(value: any): string {
    return typeof value === 'string' ? value : JSON.stringify(value);
  }

  private static getGettable(value: string): any {
    try {
      return JSON.parse(value);
    } catch (e) {
      return value;
    }
  }
}
