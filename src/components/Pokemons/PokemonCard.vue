<template>
  <div>
    <v-card
      elevation="4"
      max-height="400px"
      min-height="370px"
      v-if="pokemon"
      class="ma-4 px-5 pt-7 pokemon-card"
      :style="{
        'border-color': getTypeColor(pokemon.types[0].type.name) + '!important',
      }"
    >
      <v-img
        :lazy-src="getPokemonImg(pokemon.sprites.other)"
        height="200px"
        max-height="200px"
        :src="getPokemonImg(pokemon.sprites.other)"
        contain
      ></v-img>
      <v-card-title
        class="text-h6 mt-3 pb-2 card-title"
        v-text="capitalizeName(pokemon.name)"
      ></v-card-title>
      <v-list-item-subtitle>
        <v-chip
          v-for="type in pokemon.types"
          :key="type.slot"
          class="ma-2"
          :color="getTypeColor(type.type.name)"
          text-color="white"
          >{{ capitalizeType(type.type.name) }}
        </v-chip>
      </v-list-item-subtitle>
    </v-card>
    <div class="container-loading" v-else><LoadingPokeball /></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import LoadingPokeball from "@/components/shared/LoadingPokeball.vue";
import { Pokemon } from "@/models/Pokemons/Pokemon";
import { Result } from "@/models/PokemonsList/Result";
import { getPokemonsByName } from "@/service/pokemons";
import { Other } from "@/models/Pokemons/Other";
import { colors } from "@/models/Type/colors";

@Component({
  components: {
    LoadingPokeball,
  },
})
export default class PokemonCard extends Vue {
  @Prop()
  public pokemonResult!: Result;
  public pokemon: Pokemon | null = null;
  public imageLoaded = false;

  private mounted() {
    this.loadPokemon();
  }

  private capitalizeName(name: string): string {
    const spplitedName = name.split("-");
    const allUpperCase = ["GMAX"];
    spplitedName.map((n, index) => {
      if (allUpperCase.includes(n.toUpperCase())) {
        n = n.toUpperCase();
      } else {
        n = n.charAt(0).toUpperCase() + n.slice(1);
      }
      spplitedName[index] = n;
    });
    return spplitedName.join(" ");
  }

  public get loading(): boolean {
    return !!this.pokemon && this.imageLoaded;
  }

  private getTypeColor(name: string): string {
    return (colors as never)[name];
  }

  private capitalizeType(name: string): string {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  private getPokemonImg(other: Other): string {
    this.imageLoaded = false;
    if (other.dream_world.front_default) {
      this.imageLoaded = true;
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
      this.imageLoaded = true;
      return require("@/assets/NoPokemon.png");
    }
    const url = partialUrl.substring(0, indexSufix);
    this.imageLoaded = true;
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
<style scoped>
.pokemon-card {
  border: solid 5px !important;
  border-radius: 30px !important;
}
.pokemon-card:hover {
  transform: scale(1.05);
  cursor: pointer;
  transition: 0.6s;
  transition-delay: 0.25s;
  filter: brightness(110%);
}
.container-loading {
  height: 360px;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
}
</style>
