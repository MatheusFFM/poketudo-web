<template>
  <transition name="slide">
    <PokemonInfos
      v-if="pokemon && specie"
      :pokemon="pokemon"
      :specie="specie"
    />
  </transition>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import PokemonInfos from "@/components/Pokemon/PokemonInfos.vue";
import { Pokemon } from "@/models/Pokemons/Pokemon";
import { Specie } from "@/models/Specie/Specie";
import { getPokemonsByName } from "@/service/pokemons";
import { getSpecieByName } from "@/service/species";

@Component({
  components: {
    PokemonInfos,
  },
})
export default class Pokemons extends Vue {
  public pokemon: Pokemon | null = null;
  public specie: Specie | null = null;

  public get pokemonName(): string {
    return this.$route.params.name;
  }

  public mounted() {
    this.loadPokemon();
  }

  private async loadPokemon() {
    if (this.pokemonName) {
      const pokemonFetched = await getPokemonsByName(this.pokemonName);
      if (pokemonFetched) {
        this.pokemon = pokemonFetched;
        this.loadSpecie();
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
}
</script>
