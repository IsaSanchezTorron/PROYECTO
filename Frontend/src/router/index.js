import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Landing",
    component: () => import("../views/Landing.vue"),
  },
  {
    path: "/",
    name: "Register",
    component: () => import("../views/Register.vue"),
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/SobreNosotras.vue"),
  },
  {
    path: "/getall",
    name: "Allconcourses",

    component: () => import("../views/AllConcourses.vue"),
  },
  {
    path: "/finished",
    name: "Allfinished",

    component: () => import("../views/FinishedConcourses.vue"),
  },
  {
    path: "/login",
    name: "Login",

    component: () => import("../views/Login.vue"),
  },

  {
    path: "/profile",
    name: "Profile",
    component: () => import("../views/Profile.vue"),
  },
  {
    path: "/admin",
    name: "Admin",
    component: () => import("../views/Admin.vue"),
  },

  {
    path: "/ratings",
    name: "Ratings",
    component: () => import("../views/Valoraciones.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
