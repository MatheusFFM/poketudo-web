import { ActionTree } from "vuex";
import { PokemonListState } from "./state";
import { PokemonListStateMutationTypes } from "./mutations";
import { RootState } from "@/store";
// import { Container } from "typescript-ioc";
import { getPokemons } from "@/service/pokemons";

export enum PokemonListStateActionTypes {
  LOAD_POKEMON_LIST = "LOAD_POKEMON_LIST",
  LOAD_PAGE = "LOAD_PAGE",
}

const actions: ActionTree<PokemonListState, RootState> = {
  async [PokemonListStateActionTypes.LOAD_POKEMON_LIST]({ commit }) {
    const response = await getPokemons();
    if (response?.count) {
      const data = await getPokemons(0, response.count);
      commit(PokemonListStateMutationTypes.SET_POKEMONS_LIST, data);
    }
  },
  async [PokemonListStateActionTypes.LOAD_PAGE]({ commit }, page) {
    commit(PokemonListStateMutationTypes.SET_PAGE, page);
  },
};

export default actions;
