<template>
  <div>
    <div v-if="pokemonsList">
      <v-pagination
        class="my-10 mx-8"
        color="secondary"
        circle
        v-model="page"
        :length="totalPages"
        :total-visible="15"
      ></v-pagination>
      <PokemonCard
        v-for="pokemon in pokemonsList.results"
        :key="pokemon.name"
        :pokemonResult="pokemon"
      />
      <v-pagination
        class="my-10 mx-8"
        color="secondary"
        circle
        v-model="page"
        :length="totalPages"
        :total-visible="15"
      ></v-pagination>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import PokemonCard from "@/components/Pokemons/PokemonCard.vue";
import { PokemonsList } from "@/models/PokemonsList/PokemonsList";
import { getPokemons } from "../service/pokemons";

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
  public pokemonsList: PokemonsList | null = null;

  private async mounted() {
    await this.reloadPokemons();
  }

  @Watch("page")
  private async reloadPokemons() {
    this.offset = this.limit * (this.page - 1);
    const response = await getPokemons(this.offset, this.limit);
    if (response) {
      this.totalPages = Math.ceil(response.count / this.limit);
      this.pokemonsList = response;
    }
  }
}
</script>
