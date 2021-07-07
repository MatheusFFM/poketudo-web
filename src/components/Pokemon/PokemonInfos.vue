<template>
  <div>
    <v-row class="fill">
      <v-col
        cols="12"
        sm="6"
        class="d-flex flex-column justify-center align-center pa-10"
        :style="{
          'background-color':
            getTypeColor(pokemon.types[0].type.name) + '!important',
        }"
      >
        <v-img
          :lazy-src="getPokemonImg(pokemon.sprites.other)"
          :src="getPokemonImg(pokemon.sprites.other)"
          width="380px"
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
  height: 100vh;
}
.image-container {
  background-color: black !important;
}
.image {
  background-color: yellow !important;
}
</style>
