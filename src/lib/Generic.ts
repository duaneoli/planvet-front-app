export class Generic<T = Record<string, any>> {
  private obj: Partial<T>;

  constructor(init: Partial<T> = {}) {
    this.obj = init;
  }

  getAll() {
    return this.obj as T;
  }

  get(key: keyof T): any | undefined {
    return this.obj[key] as T[keyof T];
  }

  add(key: keyof T, value: any) {
    this.obj[key] = value;
  }

  remove(key: keyof T) {
    delete this.obj[key];
  }

  set(obj: T) {
    this.obj = obj;
  }

  clear() {
    this.obj = {};
  }
}
