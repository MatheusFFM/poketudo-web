<template>
  <div>
    <PokemonCard
      v-for="pokemon in pokemons"
      :key="pokemon.id"
      :pokemon="pokemon"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import PokemonCard from "@/components/Pokemons/PokemonCard.vue";
import { PokemonsList } from "@/models/PokemonsList/PokemonsList";
import { Pokemon } from "../models/Pokemons/Pokemon";
import { getPokemons, getPokemonsByName } from "../service/pokemons";

@Component({
  components: {
    PokemonCard,
  },
})
export default class Pokemons extends Vue {
  public offset = 0;
  public limit = 20;
  public pokemonsList: PokemonsList | undefined;
  public pokemons: Pokemon[] = [];

  private async mounted() {
    await this.reloadPokemons();
  }

  private async reloadPokemons() {
    const response = await getPokemons(this.offset, this.limit);
    if (response) {
      this.pokemonsList = response;
      this.loadAllPokemons();
    }
  }

  private async loadAllPokemons() {
    if (this.pokemonsList?.results) {
      for (let result of this.pokemonsList.results) {
        const pokemonFetched = await getPokemonsByName(result.name);
        if (pokemonFetched) {
          this.pokemons.push(pokemonFetched);
        }
      }
    }
  }
}
</script>
