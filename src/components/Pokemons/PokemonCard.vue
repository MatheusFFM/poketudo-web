<template>
  <div>
    <v-card
      elevation="4"
      max-height="400px"
      min-height="370px"
      class="ma-4 px-5 pb-3 pokemon-card"
      v-if="pokemon && specie"
      :class="{ 'pt-7': !specie, 'pt-0 ': !!specie }"
      :style="{
        'border-color': getTypeColor(pokemon.types[0].type.name) + '!important',
      }"
    >
      <v-card-subtitle
        v-if="specie"
        class="text-h8 font-weight-bold card-subtitle pb-1"
      >
        #{{ formatPokedexNumber(specie.pokedex_numbers[0].entry_number) }}
      </v-card-subtitle>
      <v-img
        contain
        height="200px"
        max-height="200px"
        transition="fade-transition"
        @load="onImgLoad"
        :alt="pokemon.name"
        :src="getPokemonImg(pokemon.sprites.other)"
        :lazy-src="getPokemonImg(pokemon.sprites.other)"
      />
      <v-progress-circular
        indeterminate
        :color="
          getTypeColor(
            pokemon.types.length > 1
              ? pokemon.types[1].type.name
              : pokemon.types[0].type.name
          )
        "
        v-show="!imageLoaded"
      />
      <v-card-title class="text-h6 mt-1 pb-2 card-title"
        ><span>{{ capitalizeName(pokemon.name) }}</span>
      </v-card-title>
      <v-card-text>
        <v-chip
          class="ma-2 mt-1"
          text-color="white"
          :key="type.slot"
          :color="getTypeColor(type.type.name)"
          v-for="type in pokemon.types"
          >{{ capitalizeType(type.type.name) }}
        </v-chip>
      </v-card-text>
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
import { getSpecieByName } from "@/service/species";
import { Other } from "@/models/Pokemons/Other";
import { colors } from "@/models/Type/colors";
import { Specie } from "@/models/Specie/Specie";

@Component({
  components: {
    LoadingPokeball,
  },
})
export default class PokemonCard extends Vue {
  @Prop()
  public pokemonResult!: Result;
  public pokemon: Pokemon | null = null;
  public specie: Specie | null = null;
  public imageLoaded = false;

  private mounted() {
    this.loadPokemon();
  }

  private onImgLoad() {
    this.imageLoaded = true;
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

  public get loading(): boolean {
    return !!this.pokemon;
  }

  private getTypeColor(name: string): string {
    return (colors as never)[name];
  }

  private capitalizeType(name: string): string {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  private formatPokedexNumber(pokedexNumber: number): string {
    let result = pokedexNumber.toString();
    while (result.length < 3) {
      result = "0".concat(result);
    }
    return result;
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
<style scoped>
.pokemon-card {
  border: solid 5px !important;
  border-radius: 30px !important;
  text-align: center !important;
}
.pokemon-card:hover {
  transform: scale(1.05);
  cursor: pointer;
  transition: 0.6s;
  transition-delay: 0.25s;
  filter: brightness(110%);
}
.card-title {
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
}
.card-subtitle {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
.container-loading {
  height: 360px;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
}
</style>
