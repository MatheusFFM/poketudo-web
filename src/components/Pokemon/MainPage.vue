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
        class="image-container mt-6"
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
      class="
        no-line-height
        d-flex
        flex-column
        justify-center
        align-center
        px-2 px-md-10
        py-7
      "
      :style="{
        'background-color':
          getTypeColor(pokemon.types[0].type.name) + '!important',
      }"
    >
      <v-chip
        color="white align-self-end mr-7"
        class="mt-6"
        large
        :text-color="getTypeColor(pokemon.types[0].type.name)"
      >
        <v-chip
          class="mx-2"
          text-color="white"
          :key="type.slot"
          :color="getTypeColor(type.type.name)"
          v-for="type in pokemon.types"
          >{{ capitalizeType(type.type.name) }}
        </v-chip>
      </v-chip>
      <v-card elevation="3" shaped class="content-card mt-12 mx-1 px-4 pt-3">
        <v-card-title class="text-h4 font-weight-bold">
          {{ capitalizeName(pokemon.name, true) }}
        </v-card-title>
        <v-card-subtitle class="text-h8 my-1">
          {{ getFlavorText() }}
        </v-card-subtitle>
        <v-card-text class="text-h6">
          <v-row>
            <v-col cols="12" sm="6">
              <span
                class="font-weight-bold"
                :style="{
                  color: getTypeColor(
                    pokemon.types.length > 1
                      ? pokemon.types[1].type.name
                      : pokemon.types[0].type.name
                  ),
                }"
              >
                Height:
              </span>
              {{ convertHeight(pokemon.height) }} m
            </v-col>
            <v-col cols="12" sm="6">
              <span
                class="font-weight-bold"
                :style="{
                  color: getTypeColor(
                    pokemon.types.length > 1
                      ? pokemon.types[1].type.name
                      : pokemon.types[0].type.name
                  ),
                }"
              >
                Weight:
              </span>
              {{ convertWeight(pokemon.weight) }} Kg
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <span
                class="font-weight-bold"
                :style="{
                  color: getTypeColor(
                    pokemon.types.length > 1
                      ? pokemon.types[1].type.name
                      : pokemon.types[0].type.name
                  ),
                }"
                >Genus:</span
              >
              {{ getGenus() }}
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <span
                class="font-weight-bold"
                :style="{
                  color: getTypeColor(
                    pokemon.types.length > 1
                      ? pokemon.types[1].type.name
                      : pokemon.types[0].type.name
                  ),
                }"
                >Generation:</span
              >
              {{ getGeneration() }}
            </v-col>
          </v-row>
          <v-row class="d-flex flex-row justify-center align-center my-6">
            <v-chip
              text-color="white"
              :color="colorsCaracteristics.legendary"
              v-if="specie.is_legendary"
            >
              Legendary
            </v-chip>
            <v-chip
              text-color="white"
              :color="colorsCaracteristics.mythical"
              v-if="specie.is_mythical"
            >
              Mythical
            </v-chip>
            <v-chip
              text-color="white"
              :color="colorsCaracteristics.baby"
              v-if="specie.is_baby"
            >
              Baby
            </v-chip>
            <v-chip
              small
              text-color="white"
              :color="
                getTypeColor(
                  pokemon.types.length > 1
                    ? pokemon.types[1].type.name
                    : pokemon.types[0].type.name
                )
              "
              v-if="pokemon.is_default"
            >
              Default
            </v-chip>
            <v-chip
              small
              outlined
              :color="
                getTypeColor(
                  pokemon.types.length > 1
                    ? pokemon.types[1].type.name
                    : pokemon.types[0].type.name
                )
              "
              v-else
            >
              Alternative
            </v-chip>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Other } from "@/models/Pokemons/Other";
import { Component, Prop, Vue } from "vue-property-decorator";
import { Pokemon } from "@/models/Pokemons/Pokemon";
import { Specie } from "@/models/Specie/Specie";
import { colors } from "@/models/Type/colors";
import { colorsCaracteristics } from "@/models/Pokemons/CaracteristicsEnum";

@Component
export default class MainPage extends Vue {
  @Prop()
  public pokemon!: Pokemon;
  @Prop()
  public specie!: Specie;

  public colorsCaracteristics = colorsCaracteristics;

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

  private capitalizeName(name: string, uniqueName = false): string {
    if (!uniqueName) {
      if (this.specie?.names) {
        for (let n of this.specie.names) {
          if (n.language.name === "en") {
            return n.name;
          }
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

  private capitalizeType(name: string): string {
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

  private getFlavorText(): string {
    if (this.specie.flavor_text_entries.length > 0) {
      return (
        this.specie.flavor_text_entries
          .find((t) => t.language.name === "en")
          ?.flavor_text.replaceAll("POKéMON", "pokémon")
          .replaceAll("\f", " ") || ""
      );
    }
    return "";
  }

  private getGenus(): string {
    return (
      this.specie.genera.find((g) => g.language.name === "en")?.genus ||
      "Unknown"
    );
  }

  private getGeneration(): string {
    const generation = this.specie.generation.name;
    return (
      generation.charAt(0).toUpperCase() +
        generation.substring(1, generation.length) || ""
    );
  }

  private convertHeight(height: number): number {
    return Math.floor(height * 0.1 * 100) / 100;
  }

  private convertWeight(weight: number): number {
    return Math.floor(weight * 0.1 * 100) / 100;
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
.content-card {
  width: 40vw;
  min-height: 410px;
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
  .content-card {
    width: 90vw;
  }
}
</style>
