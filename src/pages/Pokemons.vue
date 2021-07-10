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
          <router-link class="no-decoration" :to="'/pokemon/' + pokemon.name">
            <PokemonCard :pokemonResult="pokemon" />
          </router-link>
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
import { namespace } from "vuex-class";
import { PokemonListStateActionTypes } from "@/store/pokemonListStore/actions";
import { PokemonListGetterTypes } from "@/store/pokemonListStore/getters";
import { StoreNamespaces } from "@/store/namespaces";
import PokemonCard from "@/components/Pokemons/PokemonCard.vue";
import { PokemonsList } from "@/models/PokemonsList/PokemonsList";
import { getPokemons } from "../service/pokemons";
import { Result } from "@/models/PokemonsList/Result";

const pokemonListNamespace = namespace(StoreNamespaces.POKEMON_LIST);

@Component({
  components: {
    PokemonCard,
  },
})
export default class Pokemons extends Vue {
  public offset = 0;
  public limit = 52;
  public page = 1;
  public totalPages = 1;
  public pokemonsList: PokemonsList | null = null;

  @pokemonListNamespace.State
  public pokemonListState!: () => Promise<PokemonsList | null>;

  @pokemonListNamespace.Getter(PokemonListGetterTypes.FETCH_POKEMONS_LIST)
  public pokemonListOnStore!: PokemonsList;

  @pokemonListNamespace.Getter(PokemonListGetterTypes.FETCH_PAGE)
  public pageOnStore!: number;

  @pokemonListNamespace.Action(PokemonListStateActionTypes.LOAD_POKEMON_LIST)
  public fetchStore!: () => Promise<PokemonsList | null>;

  @pokemonListNamespace.Action(PokemonListStateActionTypes.LOAD_PAGE)
  public updatePage!: (page: number) => Promise<void>;

  private async mounted() {
    window.scrollTo(0, 0);
    this.page = this.pageOnStore || 1;
    await this.reloadPokemons();
  }

  @Watch("page")
  private async reloadPokemons() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    this.offset = this.limit * (this.page - 1);

    let store = this.pokemonListOnStore;

    if (!store) {
      await this.fetchStore();
      store = this.pokemonListOnStore;
    }

    if (store) {
      let results: Result[] = store.results;
      this.totalPages = Math.ceil(store.count / this.limit);
      results = results.slice(this.offset, this.limit * this.page);
      this.pokemonsList = { ...store, results };
      this.updatePage(this.page);
      return;
    } else {
      const response = await getPokemons(this.offset, this.limit);
      if (response) {
        this.totalPages = Math.ceil(response.count / this.limit);
        this.pokemonsList = response;
        this.limit = this.limit * this.page;
        this.updatePage(this.page);
      }
    }
  }
}
</script>
<style scoped>
.no-decoration {
  text-decoration: none !important;
}
</style>
