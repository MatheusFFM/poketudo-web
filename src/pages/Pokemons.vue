<template>
  <v-container fluid class="px-3 px-sm-5 px-md-7 px-lg-12">
    <div v-if="pokemonsList">
      <v-pagination
        class="my-10"
        color="secondary"
        circle
        v-model="page"
        :length="totalPages"
        :total-visible="15"
      ></v-pagination>

      <v-row dense>
        <v-col
          v-for="pokemon in pokemonsList.results"
          :key="pokemon.name"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <PokemonCard :pokemonResult="pokemon" />
        </v-col>
      </v-row>

      <v-pagination
        class="my-10 mx-8"
        color="secondary"
        circle
        v-model="page"
        :length="totalPages"
        :total-visible="15"
      ></v-pagination>
    </div>
  </v-container>
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
  public limit = 100;
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
