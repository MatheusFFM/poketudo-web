<template>
  <div>
    <div v-if="pokemon">
      {{ pokemon.name }}
      <v-img
        :lazy-src="getPokemonImg(pokemon.sprites.other)"
        max-height="300"
        max-width="421"
        :src="getPokemonImg(pokemon.sprites.other)"
        contain
      ></v-img>
      <v-chip
        v-for="type in pokemon.types"
        :key="type.slot"
        class="ma-2"
        :color="getTypeColor(type.type.name)"
        text-color="white"
        >{{ captalizeType(type.type.name) }}
      </v-chip>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Pokemon } from "@/models/Pokemons/Pokemon";
import { Result } from "@/models/PokemonsList/Result";
import { getPokemonsByName } from "@/service/pokemons";
import { Other } from "@/models/Pokemons/Other";
import { colors } from "@/models/Type/colors";

@Component
export default class PokemonCard extends Vue {
  @Prop()
  public pokemonResult!: Result;
  public pokemon: Pokemon | null = null;

  private mounted() {
    this.loadPokemon();
  }

  private getTypeColor(name: string): string {
    return (colors as never)[name];
  }

  private captalizeType(name: string): string {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  private getPokemonImg(other: Other): string {
    if (other.dream_world.front_default) {
      return other.dream_world.front_default;
    }
    const officialArtwork = "front_default";
    const jumpChars = 3;
    const otherString = JSON.stringify(other);
    const index = otherString.lastIndexOf(officialArtwork);
    const partialUrl = otherString.substring(
      index + jumpChars + officialArtwork.length,
      otherString.length
    );
    const indexSufix = partialUrl.indexOf('"');
    if (indexSufix === -1) {
      return require("@/assets/NoPokemon.png");
    }
    const url = partialUrl.substring(0, indexSufix);
    return url;
  }

  private async loadPokemon() {
    if (this.pokemonResult.name) {
      const pokemonFetched = await getPokemonsByName(this.pokemonResult.name);
      if (pokemonFetched) {
        this.pokemon = pokemonFetched;
      }
    }
  }
}
</script>
