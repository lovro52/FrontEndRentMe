/* import router from "@/router";
import axios from "axios";

const baseURL = "http://localhost:3000/";

let Service = axios.create({
  baseURL: baseURL,
  timeout: 20000,
});

Service.interceptors.request.use((request) => {
  try {
    const token = Auth.getToken();
    if (token) {
      request.headers["Authorization"] = "Bearer " + token;
    }
  } catch (e) {
    console.error(e);
  }
  return request;
});

Service.interceptors.response.use(
  (response) => {
    console.log("Interceptor", response);
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      Auth.logout();
      router.go();
    }
    return Promise.reject(error);
  }
);

let Auth = {
  async login(username, password) {
    try {
      let response = await Service.post("/auth", { username, password });
      let user = response.data;
      localStorage.setItem("user", JSON.stringify(user));
      return true;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  },

  async register(username, password) {
    try {
      let response = await Service.post("/users", { username, password });
      console.log("Registration successful:", response.data);
      return response.data;
    } catch (error) {
      if (error.response) {
        console.error("Registration failed:", error.response.data);
      } else {
        console.error("Registration failed:", error.message);
      }
      throw error;
    }
  },

  logout() {
    localStorage.removeItem("user");
  },

  getUser() {
    return JSON.parse(localStorage.getItem("user"));
  },

  getToken() {
    let user = Auth.getUser();
    return user && user.token ? user.token : false;
  },

  authenticated() {
    return !!Auth.getToken();
  },

  state: {
    get authenticated() {
      return Auth.authenticated();
    },
  },
};

let Companies = {
  async getOne(id) {
    try {
      let response = await Service.get(`/Companies/${id}`);
      let doc = response.data;
      return {
        id: doc._id,
        naziv: doc.naziv,
        lokacija: doc.lokacija,
      };
    } catch (error) {
      console.error("Failed to fetch company:", error);
      throw error;
    }
  },

  async getAll() {
    try {
      let response = await Service.get("/GetAllCompanies");
      let data = response.data;
      return data.map((doc) => ({
        id: doc._id,
        naziv: doc.naziv,
        lokacija: doc.lokacija,
      }));
    } catch (error) {
      console.error("Failed to fetch companies:", error);
      throw error;
    }
  },
};

/* async function testRegister() {
  try {
    const userData = {
      username: "testuser",
      password: "testpassword",
    };

    console.time("register");
    const response = await Auth.register(userData.username, userData.password);
    console.timeEnd("register");
    console.log("Registration successful:", response);
  } catch (error) {
    console.error("Registration failed:", error);
  }
} */

/* testRegister();

export { Auth, Service, Companies }; */
