import axios from "axios";

class PlanvetClient {
  static client = (() => {
    const api = axios.create({
      baseURL: "http://localhost:5000",
      withCredentials: true,
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
  },
  animals: {
    species: {
      list: "/animals/species",
      breeds: {
        list: (id: number) => `/animals/species/${id}/breeds`,
      },
    },
  },
  contracts: {
    user: {
      getAll: "/user/contracts",
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
