import Vue from "vue";
import Vuex from "vuex";
import pokemonList from "./pokemonListStore/index";

Vue.use(Vuex);

export class RootState {}

const store = new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    pokemonList,
  },
});

Object.assign(window, { $store: store });

export default store;
