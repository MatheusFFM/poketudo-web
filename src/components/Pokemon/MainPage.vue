<template>
  <v-row class="fill">
    <v-col
      cols="12"
      sm="6"
      class="d-flex flex-column align-center px-2 px-md-10 py-7"
      :style="{
        'background-color':
          getTypeColor(pokemon.types[0].type.name) + '!important',
      }"
    >
      <div class="pokemon-name-container pl-5">
        <h1 class="pokemon-name">{{ capitalizeName(pokemon.name) }}</h1>
        <v-chip
          class="ma-2 mt-1 pokemon-id"
          :text-color="getTypeColor(pokemon.types[0].type.name)"
          color="white"
        >
          <h2>
            #{{ formatPokedexNumber(specie.pokedex_numbers[0].entry_number) }}
          </h2>
        </v-chip>
      </div>
      <v-img
        class="image-container"
        transition="fade-transition"
        contain
        :alt="pokemon.name"
        :lazy-src="getPokemonImg(pokemon.sprites.other)"
        :src="getPokemonImg(pokemon.sprites.other)"
        @load="onImgLoad"
      />
      <v-progress-circular indeterminate color="white" v-if="!imageLoaded" />
    </v-col>
    <v-col
      cols="12"
      sm="6"
      class="no-line-height"
      :style="{
        'background-color':
          getTypeColor(pokemon.types[0].type.name) + '!important',
      }"
    >
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Other } from "@/models/Pokemons/Other";
import { Pokemon } from "@/models/Pokemons/Pokemon";
import { Specie } from "@/models/Specie/Specie";
import { colors } from "@/models/Type/colors";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class MainPage extends Vue {
  @Prop()
  public pokemon!: Pokemon;
  @Prop()
  public specie!: Specie;

  public imageLoaded = false;

  private onImgLoad() {
    this.imageLoaded = true;
  }

  private getTypeColor(name: string): string {
    return (colors as never)[name];
  }

  private formatPokedexNumber(pokedexNumber: number): string {
    let result = pokedexNumber.toString();
    while (result.length < 3) {
      result = "0".concat(result);
    }
    return result;
  }

  private capitalizeName(name: string): string {
    if (this.specie?.names) {
      for (let n of this.specie.names) {
        if (n.language.name === "en") {
          return n.name;
        }
      }
    }
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
}
</script>

<style scoped>
.fill {
  width: 100vw;
  height: calc(100vh - 56px);
}
.pokemon-name-container {
  width: 100%;
}
.pokemon-name {
  color: white;
  font-size: 5rem;
  z-index: 5;
}
.pokemon-id {
  font-weight: 900;
}
.image-container {
  max-height: 350px;
  min-width: 350px;
}
.image {
  background-color: yellow !important;
}
.no-line-height {
  line-height: 0vh;
}
@media only screen and (max-width: 900px) {
  .image-container {
    max-height: 270px;
    min-width: 270px;
  }
  .pokemon-name {
    font-size: 3.3rem;
  }
}
@media only screen and (max-width: 600px) {
  .fill {
    height: calc(200vh - 56px);
    max-height: 1000px;
  }
  .image-container {
    height: 310px;
    max-width: 90vw;
  }
  .pokemon-name {
    font-size: 3rem;
  }
}
</style>
