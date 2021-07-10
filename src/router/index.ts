import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../pages/Home.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
    props: {
      menu: true,
      icon: "mdi-home-circle",
    },
  },
  {
    path: "/pokemons",
    name: "Pokemons",
    props: {
      menu: true,
      icon: "mdi-pokeball",
    },
    component: () => import("../pages/Pokemons.vue"),
  },
  {
    path: "/pokemon/:name",
    name: "pokemon",
    props: {
      menu: false,
    },

    component: () => import("../pages/Pokemon.vue"),
  },
  {
    path: "/settings",
    name: "Settings",
    props: {
      menu: true,
      icon: "mdi-cog-outline",
    },

    component: () => import("../pages/Settings.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
