import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import RegisterView from "../views/RegisterView";
import LoginView from "../views/LoginView";
import OurCompanies from "../views/OurCompanies";
import OurVozila from "../views/OurVozilaView";
import Profile from "../views/Profile.vue";
import AvailableVehiclesView from "../views/AvailableVehiclesView.vue";
import VehiclesByTypeView from "../views/VehiclesByTypeView.vue";
//import { Auth } from "@/services";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/VehiclesByType/type/:type",
    name: "VehiclesByType",
    component: VehiclesByTypeView,
    props: true,
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/OurCompanies",
    name: "OurCompanies",
    component: OurCompanies,
  },
  {
    path: "/OurVozila/:companyId",
    name: "OurVozila",
    component: OurVozila,
  },
  {
    path: "/profile",
    name: "Profile ",
    component: Profile,
  },
  {
    path: "/available-vehicles",
    name: "AvailableVehicles",
    component: AvailableVehiclesView,
    props: (route) => ({
      startDate: route.params.startDate,
      endDate: route.params.endDate,
    }),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// izvrši prije svake rute
// router.beforeEach((to, from, next) => {
//   redirect to login page if not logged in and trying to access a restricted
//   page;
//   const publicPages = ["/login", "/register"];
//   const authRequired = !publicPages.includes(to.path);
//   const user = Auth.getUser();

//   ako je potreban login, ali nema korisnika
//   if (authRequired && !user) {
//     return next("/login");
//   }
//   next();
// });
export default router;
