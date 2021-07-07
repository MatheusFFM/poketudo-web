<template>
  <div>
    <v-container fluid>
      <v-row class="fill">
        <v-col
          cols="12"
          sm="6"
          class="d-flex flex-column justify-center align-center px-10 py-7 fill"
          :style="{
            'background-color':
              getTypeColor(pokemon.types[0].type.name) + '!important',
          }"
        >
          <div class="pokemon-name-container">
            <h1 class="pokemon-name">{{ capitalizeName(pokemon.name) }}</h1>
            <h2 class="pokemon-id">
              #{{ formatPokedexNumber(specie.pokedex_numbers[0].entry_number) }}
            </h2>
          </div>
          <v-img
            :lazy-src="getPokemonImg(pokemon.sprites.other)"
            :src="getPokemonImg(pokemon.sprites.other)"
            min-height="400px"
            min-width="400px"
            contain
          />
        </v-col>
        <v-col
          cols="12"
          sm="6"
          class="fill"
          :style="{
            'background-color':
              getTypeColor(pokemon.types[0].type.name) + '!important',
          }"
        >
        </v-col>
      </v-row>
      <PokemonDetails
        v-if="pokemon && specie"
        :pokemon="pokemon"
        :specie="specie"
      />
    </v-container>
  </div>
</template>

<script lang="ts">
import { Other } from "@/models/Pokemons/Other";
import { Pokemon } from "@/models/Pokemons/Pokemon";
import { Specie } from "@/models/Specie/Specie";
import { colors } from "@/models/Type/colors";
import { Component, Prop, Vue } from "vue-property-decorator";
import PokemonDetails from "@/components/Pokemon/PokemonDetails.vue";

@Component({
  components: {
    PokemonDetails,
  },
})
export default class PokemonInfos extends Vue {
  @Prop()
  public pokemon!: Pokemon;
  @Prop()
  public specie!: Specie;

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
  font-size: 60px;
}
.pokemon-id {
  color: darkslategray;
}
.image-container {
  background-color: black !important;
}
.image {
  background-color: yellow !important;
}
</style>
