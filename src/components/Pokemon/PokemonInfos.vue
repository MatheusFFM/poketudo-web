<template>
  <div>
    <router-link :to="`/pokemon/${last}`">
      <v-icon
        x-large
        color="white"
        class="left-icon icon-container"
        @click="$emit('update', last)"
        :style="{
          'background-color':
            getTypeColor(pokemon.types[0].type.name) + '!important',
        }"
      >
        mdi-arrow-left-drop-circle-outline
      </v-icon>
    </router-link>
    <router-link :to="`/pokemon/${next}`">
      <v-icon
        x-large
        color="white"
        class="right-icon icon-container"
        @click="$emit('update', next)"
        :style="{
          'background-color':
            getTypeColor(pokemon.types[0].type.name) + '!important',
        }"
      >
        mdi-arrow-right-drop-circle-outline
      </v-icon></router-link
    >
    <v-container fluid>
      <v-row class="fill">
        <v-col
          cols="12"
          sm="6"
          class="
            d-flex
            flex-column
            justify-center
            align-center
            px-2 px-md-10
            py-7
            fill
          "
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
            class="image-container"
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
  @Prop()
  public next!: string;
  @Prop()
  public last!: string;

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
  color: darkslategray;
}
.image-container {
  max-height: 350px;
  min-width: 350px;
}
.image {
  background-color: yellow !important;
}
.icon-container {
  position: fixed;
  border-radius: 100% !important;
  font-size: 60px !important;
  width: 80px;
  height: 80px;
  bottom: 10px;
}
.icon-container:hover {
  transition: 0.6s;
  cursor: pointer;
  transform: scale(1.1);
}
.right-icon {
  right: 10px;
}
.left-icon {
  left: 10px;
}
@media only screen and (max-width: 900px) {
  .image-container {
    max-height: 270px;
    min-width: 270px;
  }
  .pokemon-name {
    font-size: 3.3rem;
  }
  .icon-container {
    font-size: 40px !important;
    width: 50px;
    height: 50px;
  }
}
@media only screen and (max-width: 600px) {
  .image-container {
    max-height: 250px;
    min-width: 250px;
  }
  .pokemon-name {
    font-size: 3rem;
  }
}
</style>
