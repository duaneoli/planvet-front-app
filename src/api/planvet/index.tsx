import axios from "axios";
import qs from "qs";

class PlanvetClient {
  static client = (() => {
    const api = axios.create({
      baseURL: "http://localhost:5000",
      withCredentials: true,
      paramsSerializer: {
        serialize: (params) => {
          return qs.stringify(params, { arrayFormat: "repeat", skipNulls: true });
        },
      },
    });

    return api;
  })();
}

const PlanvetRouters = {
  register: {
    sign_up: "/register/sign-up",
  },
  users: {
    created: "/users",
    update: (id: number) => `/users/${id}`,
    me: {
      get: "/users/me",
      update: "/users/me/update",
    },
    invoices: {
      list: "/user/invoices",
    },
    contracts: {
      getAll: "/user/contracts",
    },
  },
  animals: {
    species: {
      list: "/animals/species",
      breeds: {
        list: (id: number) => `/animals/species/${id}/breeds`,
      },
    },
  },
  auth: {
    login: "/auth/login",
  },
};

export class PlanvetApi {
  protected static client = PlanvetClient.client;
  protected static router = PlanvetRouters;
}
