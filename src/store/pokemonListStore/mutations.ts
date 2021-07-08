import { MutationTree } from "vuex";
import { PokemonListState } from "./state";
import { PokemonsList } from "@/models/PokemonsList/PokemonsList";

export enum PokemonListStateMutationTypes {
  SET_POKEMONS_LIST = "SET_POKEMONS_LIST",
  SET_PAGE = "SET_PAGE",
}

const mutations: MutationTree<PokemonListState> = {
  [PokemonListStateMutationTypes.SET_POKEMONS_LIST](
    state: PokemonListState,
    payload: PokemonsList
  ) {
    state.pokemonsList = payload;
  },
  [PokemonListStateMutationTypes.SET_PAGE](
    state: PokemonListState,
    payload: number
  ) {
    state.page = payload;
  },
};

export default mutations;
