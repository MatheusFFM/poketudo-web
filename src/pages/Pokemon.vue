<template>
  <transition name="slide">
    <PokemonInfos
      v-if="pokemon && specie"
      :pokemon="pokemon"
      :specie="specie"
      :last="previus"
      :next="next"
      @update="reload"
    />
    <div class="fill" v-else>
      <LoadingPokeball />
    </div>
  </transition>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import PokemonInfos from "@/components/Pokemon/PokemonInfos.vue";
import { Pokemon } from "@/models/Pokemons/Pokemon";
import { Specie } from "@/models/Specie/Specie";
import { getPokemonsByName, getPokemon, getPokemons } from "@/service/pokemons";
import { getSpecieByName } from "@/service/species";
import LoadingPokeball from "@/components/shared/LoadingPokeball.vue";

@Component({
  components: {
    PokemonInfos,
    LoadingPokeball,
  },
})
export default class Pokemons extends Vue {
  public pokemon: Pokemon | null = null;
  public specie: Specie | null = null;
  public pokemonName: string | null = null;
  public previus: string | null = null;
  public next: string | null = null;

  private mounted() {
    this.pokemonName = this.$route.params.name;
    window.scrollTo(0, 0);
    this.loadPokemon();
  }

  private async loadPokemon() {
    if (this.pokemonName) {
      const pokemonFetched = await getPokemonsByName(this.pokemonName);
      if (pokemonFetched) {
        this.pokemon = pokemonFetched;
        this.loadSpecie();
        this.previus = await this.loadPreviusPokemon(this.pokemon.id - 1);
        this.next =
          (await this.loadNextPokemon(this.pokemon.id + 1)) ||
          (await this.loadNextPokemon(1));
      }
    }
  }

  private async loadSpecie() {
    if (this.pokemon?.species) {
      const specieFetched = await getSpecieByName(this.pokemon.species.name);
      if (specieFetched) {
        this.specie = specieFetched;
      }
    }
  }

  private async loadPreviusPokemon(id: number): Promise<string | null> {
    if (id === 0) {
      const pokemonsFetched = await getPokemons(0, 1);
      if (pokemonsFetched) {
        id = pokemonsFetched?.count;
      }
    }
    if (id !== 0) {
      const pokemonFetched = await getPokemon(id);
      if (pokemonFetched) {
        return pokemonFetched.name;
      }
    }
    return this.pokemon?.name || null;
  }

  private async loadNextPokemon(id: number): Promise<string | null> {
    const pokemonFetched = await getPokemon(id);
    if (pokemonFetched) {
      return pokemonFetched.name;
    } else {
      const pokemonFetched = await getPokemon(1);
      if (pokemonFetched) {
        return pokemonFetched.name;
      }
    }

    return this.pokemon?.name || null;
  }

  private async reload(newPokemon: string) {
    if (newPokemon) {
      this.pokemonName = newPokemon;
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
      this.loadPokemon();
    }
  }
}
</script>
<style scoped>
.fill {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
