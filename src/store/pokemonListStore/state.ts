import { PokemonsList } from "@/models/PokemonsList/PokemonsList";

export class PokemonListState {
  public pokemonsList?: PokemonsList | null;
  public page?: number;
}

export const state: PokemonListState = Object.assign(new PokemonListState(), {
  pokemonsList: null,
  page: 1,
});
