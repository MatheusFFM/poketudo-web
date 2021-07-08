import { Module } from "vuex";
import { PokemonListState, state } from "./state";
import { RootState } from "@/store";
import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

const pokemonList: Module<PokemonListState, RootState> = {
  actions,
  state,
  mutations,
  getters,
  namespaced: true,
};

export default pokemonList;
