import { Filters } from "@/lib/Filters";
import { SortBy } from "@/lib/SortBy";
import qs from "qs";

export class Query<S extends string = "", F extends Partial<Record<string, any>> = {}> {
  page?: number;
  pageSize?: number;
  sortBy?: SortBy<S>;
  filters?: Filters<F>;

  constructor(init: Partial<Query<S, F>> = {}) {
    this.page = init.page;
    this.pageSize = init.pageSize;
    this.sortBy = init.sortBy;
    this.filters = init.filters;
    console.log(this);
  }

  toParams() {
    console.log(this.filters?.getAll());
    return {
      page: this.page,
      pageSize: this.pageSize,
      sortBy: this.sortBy?.stringify(),
      ...this.filters?.getAll(),
    };
  }

  toString() {
    return qs.stringify(this.toParams());
  }

  static paramsToQuery<S extends string, F extends Record<string, any>>(params: {
    page?: number;
    pageSize?: number;
    sortBy?: Record<S, "ASC" | "DESC">;
    filters?: F;
  }): Query<S, F> {
    return new Query<S, F>({
      page: params.page,
      pageSize: params.pageSize,
      sortBy: new SortBy(params.sortBy),
      filters: new Filters<F>(params.filters),
    });
  }
}
