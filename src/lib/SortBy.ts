import { Generic } from "@/lib/Generic";

export class SortBy<T extends string> {
  private genericObject: Generic<Record<T, "ASC" | "DESC">>;

  constructor(init: Partial<Record<T, "ASC" | "DESC">> = {}) {
    this.genericObject = new Generic(init);
  }

  set(key: T, operator: "ASC" | "DESC") {
    this.genericObject.add(key, operator);
  }

  remove(key: T) {
    this.genericObject.remove(key);
  }

  get(key: T) {
    return this.genericObject.get(key) as "ASC" | "DESC";
  }

  getAll() {
    return this.genericObject.getAll();
  }

  stringify() {
    return Object.keys(this.genericObject.getAll())
      .map((key) => `${key}:${this.genericObject.get(key as T)}`)
      .join(",");
  }
}
