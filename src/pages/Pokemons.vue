<template>
  <div>
    <v-pagination
      color="secondary"
      circle
      v-model="page"
      :length="totalPages"
      :total-visible="7"
    ></v-pagination>
    <PokemonCard
      v-for="pokemon in pokemons"
      :key="pokemon.id"
      :pokemon="pokemon"
    />
    <v-pagination
      color="secondary"
      circle
      v-model="page"
      :length="totalPages"
      :total-visible="7"
    ></v-pagination>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
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
  public page = 1;
  public totalPages = 1;
  public pokemonsList: PokemonsList | undefined;
  public pokemons: Pokemon[] = [];

  private async mounted() {
    await this.reloadPokemons();
  }

  @Watch("page")
  private async reloadPokemons() {
    this.offset = this.limit * (this.page - 1);
    console.log("PAGE => ", this.page);
    console.log("OFFSET => ", this.offset);
    console.log("LIMIT => ", this.limit);
    this.pokemons = [];
    const response = await getPokemons(this.offset, this.limit);
    if (response) {
      this.totalPages = Math.ceil(response.count / this.limit);
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
      this.pokemonsList.results = [];
    }
  }
}
</script>
