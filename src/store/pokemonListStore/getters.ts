import { GetterTree } from "vuex";
import { PokemonListState } from "./state";
import { RootState } from "@/store";

export enum PokemonListGetterTypes {
  FETCH_POKEMONS_LIST = "FETCH_POKEMONS_LIST",
  FETCH_PAGE = "FETCH_PAGE",
}

const getters: GetterTree<PokemonListState, RootState> = {
  [PokemonListGetterTypes.FETCH_POKEMONS_LIST](state) {
    return state.pokemonsList;
  },
  [PokemonListGetterTypes.FETCH_PAGE](state) {
    return state.page;
  },
};

export default getters;
