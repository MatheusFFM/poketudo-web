<template>
  <v-row class="fill">
    <v-col
      cols="12"
      sm="6"
      class="d-flex flex-column align-center px-2 px-md-10 py-7"
      :style="{
        'background-color': mainColor + '!important',
      }"
    >
      <div class="pokemon-name-container pl-5">
        <h1 class="pokemon-name">{{ capitalizeName(pokemon.name) }}</h1>
        <v-chip
          class="ma-2 mt-1 pokemon-id"
          :text-color="mainColor"
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
        :lazy-src="getPokemonImg()"
        :src="getPokemonImg()"
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
        'background-color': mainColor + '!important',
      }"
    >
      <v-chip
        color="white align-self-end mr-7"
        class="mt-6"
        large
        :text-color="mainColor"
      >
        <v-chip
          class="mx-2"
          text-color="white"
          :key="type.slot"
          :color="getTypeColor(type.type.name)"
          v-for="type in pokemon.types"
        >
          {{
            $vuetify.lang.t(`$vuetify.Types.${capitalizeType(type.type.name)}`)
          }}
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
                  color: secundaryColor,
                }"
              >
                {{ $vuetify.lang.t(`$vuetify.Pokemon.Height`) }}:
              </span>
              {{ convertHeight(pokemon.height) }}
              {{ $vuetify.lang.t(`$vuetify.heightUnit`) }}
            </v-col>
            <v-col cols="12" sm="6">
              <span
                class="font-weight-bold"
                :style="{
                  color: secundaryColor,
                }"
              >
                {{ $vuetify.lang.t(`$vuetify.Pokemon.Weight`) }}:
              </span>
              {{ convertWeight(pokemon.weight) }}
              {{ $vuetify.lang.t(`$vuetify.weightUnit`) }}
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <span
                class="font-weight-bold"
                :style="{
                  color: secundaryColor,
                }"
              >
                {{ $vuetify.lang.t(`$vuetify.Pokemon.Genus`) }}:
              </span>
              {{ getGenus() }}
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <span
                class="font-weight-bold"
                :style="{
                  color: secundaryColor,
                }"
              >
                {{ $vuetify.lang.t(`$vuetify.Pokemon.Generation`) }}:
              </span>
              {{ getGeneration() }}
            </v-col>
          </v-row>
          <v-row class="d-flex flex-row justify-center align-center my-6">
            <v-chip
              class="mx-3"
              text-color="white"
              :color="getCaracteristicColor('legendary')"
              v-if="specie.is_legendary"
            >
              {{ $vuetify.lang.t(`$vuetify.Pokemon.Legendary`) }}
            </v-chip>
            <v-chip
              class="mx-3"
              text-color="white"
              :color="getCaracteristicColor('mythical')"
              v-if="specie.is_mythical"
            >
              {{ $vuetify.lang.t(`$vuetify.Pokemon.Mythical`) }}
            </v-chip>
            <v-chip
              class="mx-3"
              text-color="white"
              :color="getCaracteristicColor('baby')"
              v-if="specie.is_baby"
            >
              {{ $vuetify.lang.t(`$vuetify.Pokemon.Baby`) }}
            </v-chip>
            <v-chip
              class="mx-3"
              small
              text-color="white"
              :color="secundaryColor"
              v-if="pokemon.is_default"
            >
              {{ $vuetify.lang.t(`$vuetify.Pokemon.Default`) }}
            </v-chip>
            <v-chip class="mx-3" small outlined :color="secundaryColor" v-else>
              {{ $vuetify.lang.t(`$vuetify.Pokemon.Alternative`) }}
            </v-chip>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Pokemon } from "@/models/Pokemons/Pokemon";
import { Specie } from "@/models/Specie/Specie";
import PokemonFormatterHelper from "@/utils/PokemonFormatterHelper";

@Component
export default class MainPage extends Vue {
  @Prop()
  public pokemon!: Pokemon;
  @Prop()
  public specie!: Specie;

  public pokemonFormatterHelper = new PokemonFormatterHelper();

  public imageLoaded = false;

  public get mainColor(): string {
    return this.getTypeColor(this.pokemon.types[0].type.name);
  }

  public get secundaryColor(): string {
    return this.getTypeColor(
      this.pokemon.types.length > 1
        ? this.pokemon.types[1].type.name
        : this.pokemon.types[0].type.name
    );
  }

  private onImgLoad() {
    this.imageLoaded = true;
  }

  private getTypeColor(name: string): string {
    return this.pokemonFormatterHelper.getTypeColor(name);
  }

  private getCaracteristicColor(name: string): string {
    return this.pokemonFormatterHelper.getCaracteristicColor(name);
  }

  private formatPokedexNumber(pokedexNumber: number): string {
    return this.pokemonFormatterHelper.formatPokedexNumber(pokedexNumber);
  }

  private capitalizeName(name: string, uniqueName = false): string {
    return this.pokemonFormatterHelper.capitalizeName(
      this.specie,
      name,
      this.$vuetify.lang.current,
      uniqueName
    );
  }

  private capitalizeType(name: string): string {
    return this.pokemonFormatterHelper.capitalizeType(name);
  }

  private getPokemonImg(): string {
    return this.pokemonFormatterHelper.getImg(this.pokemon);
  }

  private getFlavorText(): string {
    return this.pokemonFormatterHelper.getFlavorText(
      this.specie,
      this.$vuetify.lang.current
    );
  }

  private getGenus(): string {
    return this.pokemonFormatterHelper.getGenus(
      this.specie,
      this.$vuetify.lang.current
    );
  }

  private getGeneration(): string {
    return this.pokemonFormatterHelper.getGeneration(this.specie);
  }

  private convertHeight(height: number): string {
    return this.pokemonFormatterHelper.getHeight(
      height,
      this.$vuetify.lang.current
    );
  }

  private convertWeight(weight: number): string {
    return this.pokemonFormatterHelper.getWeight(
      weight,
      this.$vuetify.lang.current
    );
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
