const keysAndStringify = {
  LOGGED_IN: false,
};

type LocalStorageKeys = keyof typeof keysAndStringify;

export class LocalStorage {
  static set(key: LocalStorageKeys, value: any) {
    localStorage.setItem(key, keysAndStringify[key] ? JSON.stringify(value) : value);
  }

  static get(key: LocalStorageKeys) {
    const value = localStorage.getItem(key);
    return keysAndStringify[key] ? JSON.parse(value || "") : value;
  }

  static remove(key: LocalStorageKeys) {
    localStorage.removeItem(key);
  }
}
