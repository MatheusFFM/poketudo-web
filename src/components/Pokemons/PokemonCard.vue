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
        :alt="pokemon.name"
        :src="getPokemonImg()"
        :lazy-src="getPokemonImg()"
        @load="onImgLoad"
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
        v-if="!imageLoaded"
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
        >
          {{
            $vuetify.lang.t(`$vuetify.Types.${capitalizeType(type.type.name)}`)
          }}
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
import { Specie } from "@/models/Specie/Specie";
import PokemonFormatterHelper from "@/utils/PokemonFormatterHelper";

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
  public pokemonFormatterHelper = new PokemonFormatterHelper();

  private mounted() {
    this.loadPokemon();
  }

  private onImgLoad() {
    this.imageLoaded = true;
  }

  private capitalizeName(name: string): string {
    if (this.specie) {
      return this.pokemonFormatterHelper.capitalizeName(this.specie, name);
    }
    return "";
  }

  public get loading(): boolean {
    return !!this.pokemon;
  }

  private getTypeColor(name: string): string {
    return this.pokemonFormatterHelper.getTypeColor(name);
  }

  private capitalizeType(name: string): string {
    return this.pokemonFormatterHelper.capitalizeType(name);
  }

  private formatPokedexNumber(pokedexNumber: number): string {
    return this.pokemonFormatterHelper.formatPokedexNumber(pokedexNumber);
  }

  private getPokemonImg(): string {
    if (this.pokemon) {
      return this.pokemonFormatterHelper.getImg(this.pokemon);
    }
    return "";
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
