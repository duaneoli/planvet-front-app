import { Generic } from "@/lib/Generic";

export class Filters<T extends Record<string, any>> {
  private genericObject: Generic<T>;

  constructor(init: Partial<T> = {}) {
    this.genericObject = new Generic(init);
  }

  set<K extends keyof T>(key: K, value: T[K]) {
    this.genericObject.add(key, value);
  }

  remove(key: keyof T) {
    this.genericObject.remove(key);
  }

  get<K extends keyof T>(key: K) {
    return this.genericObject.get(key) as K;
  }

  getAll() {
    return this.genericObject.getAll();
  }
}

new Filters<{ status: Array<"ab" | "pg" | "ca">; originalDate: string }>({ status: ["ab"] });
