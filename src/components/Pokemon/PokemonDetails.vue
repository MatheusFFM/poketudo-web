<template>
  <div>
    <v-row class="fill mt-16 mt-sm-0">
      <v-col
        cols="12"
        md="6"
        class="
          px-10
          mt-16 mt-sm-0
          pt-14 pt-md-7
          pb-14
          d-flex
          flex-column
          align-center
          justify-center
        "
      >
        <v-row>
          <v-col
            cols="6"
            md="4"
            class="d-flex flex-column align-center justify-center"
          >
            <span class="font-weight-bold mb-3 subtitle-1">Hp</span>
            <v-progress-circular
              :rotate="180"
              :size="80"
              :width="15"
              :value="getHpPorcentage"
              :color="mainColor"
            >
              {{ getHpValue }}
            </v-progress-circular>
          </v-col>
          <v-col
            cols="6"
            md="4"
            class="d-flex flex-column align-center justify-center"
          >
            <span class="font-weight-bold mb-3 subtitle-1">Ataque</span>
            <v-progress-circular
              :rotate="180"
              :size="80"
              :width="15"
              :value="getAttackPorcentage"
              :color="mainColor"
            >
              {{ getAttackValue }}
            </v-progress-circular>
          </v-col>
          <v-col
            cols="6"
            md="4"
            class="d-flex flex-column align-center justify-center"
          >
            <span class="font-weight-bold mb-3 subtitle-1">Defesa</span>
            <v-progress-circular
              :rotate="180"
              :size="80"
              :width="15"
              :value="getDefensePorcentage"
              :color="mainColor"
            >
              {{ getDefenseValue }}
            </v-progress-circular>
          </v-col>
          <v-col
            cols="6"
            md="4"
            class="d-flex flex-column align-center justify-center"
          >
            <span class="font-weight-bold mb-3 subtitle-1"
              >Ataque especial</span
            >
            <v-progress-circular
              :rotate="180"
              :size="80"
              :width="15"
              :value="getSpecialAtackPorcentage"
              :color="mainColor"
            >
              {{ getSpecialAtackValue }}
            </v-progress-circular>
          </v-col>
          <v-col
            cols="6"
            md="4"
            class="d-flex flex-column align-center justify-center"
          >
            <span class="font-weight-bold mb-3 subtitle-1"
              >Defesa especial</span
            >
            <v-progress-circular
              :rotate="180"
              :size="80"
              :width="15"
              :value="getSpecialDefensePorcentage"
              :color="mainColor"
            >
              {{ getSpecialDefenseValue }}
            </v-progress-circular>
          </v-col>
          <v-col
            cols="6"
            md="4"
            class="d-flex flex-column align-center justify-center"
          >
            <span class="font-weight-bold mb-3 subtitle-1">Velocidade</span>
            <v-progress-circular
              :rotate="180"
              :size="80"
              :width="15"
              :value="getSpeedPorcentage"
              :color="mainColor"
            >
              {{ getSpeedValue }}
            </v-progress-circular>
          </v-col>
          <v-col
            cols="6"
            md="6"
            class="d-flex flex-column align-center justify-center"
          >
            <span class="font-weight-bold mb-3 subtitle-1">Média</span>
            <v-progress-circular
              :rotate="180"
              :size="100"
              :width="20"
              :value="getAvgPorcentage"
              :color="secundaryColor"
            >
              {{ getAvgValue }}
            </v-progress-circular>
          </v-col>
          <v-col
            cols="6"
            md="6"
            class="d-flex flex-column align-center justify-center"
          >
            <span class="font-weight-bold mb-3 subtitle-1">Total</span>
            <v-progress-circular
              :rotate="180"
              :size="100"
              :width="20"
              :value="getTotalPorcentage"
              :color="secundaryColor"
            >
              {{ getTotalValue }}
            </v-progress-circular>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="6" class="fill"> </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Pokemon } from "@/models/Pokemons/Pokemon";
import { Specie } from "@/models/Specie/Specie";
import PokemonFormatterHelper from "@/utils/PokemonFormatterHelper";

@Component
export default class PokemonDetails extends Vue {
  @Prop()
  public pokemon!: Pokemon;
  @Prop()
  public specie!: Specie;

  public pokemonFormatterHelper = new PokemonFormatterHelper();

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

  private get getHpPorcentage(): number {
    return this.pokemonFormatterHelper.getHpPorcentage(this.pokemon);
  }
  private get getHpValue(): number {
    return this.pokemonFormatterHelper.getHpValue(this.pokemon);
  }
  private get getAttackPorcentage(): number {
    return this.pokemonFormatterHelper.getAttackPorcentage(this.pokemon);
  }
  private get getAttackValue(): number {
    return this.pokemonFormatterHelper.getAttackValue(this.pokemon);
  }
  private get getDefensePorcentage(): number {
    return this.pokemonFormatterHelper.getDefensePorcentage(this.pokemon);
  }
  private get getDefenseValue(): number {
    return this.pokemonFormatterHelper.getDefenseValue(this.pokemon);
  }
  private get getSpecialDefensePorcentage(): number {
    return this.pokemonFormatterHelper.getSpecialDefensePorcentage(
      this.pokemon
    );
  }
  private get getSpecialDefenseValue(): number {
    return this.pokemonFormatterHelper.getSpecialDefenseValue(this.pokemon);
  }
  private get getSpecialAtackPorcentage(): number {
    return this.pokemonFormatterHelper.getSpecialAtackPorcentage(this.pokemon);
  }
  private get getSpecialAtackValue(): number {
    return this.pokemonFormatterHelper.getSpecialAtackValue(this.pokemon);
  }
  private get getSpeedPorcentage(): number {
    return this.pokemonFormatterHelper.getSpeedPorcentage(this.pokemon);
  }
  private get getSpeedValue(): number {
    return this.pokemonFormatterHelper.getSpeedValue(this.pokemon);
  }
  private get getAvgPorcentage(): number {
    return this.pokemonFormatterHelper.getAvgPorcentage(this.pokemon);
  }
  private get getAvgValue(): number {
    return this.pokemonFormatterHelper.getAvgValue(this.pokemon);
  }
  private get getTotalPorcentage(): number {
    return this.pokemonFormatterHelper.getTotalPorcentage(this.pokemon);
  }
  private get getTotalValue(): number {
    return this.pokemonFormatterHelper.getTotalValue(this.pokemon);
  }
  private getTypeColor(name: string): string {
    return this.pokemonFormatterHelper.getTypeColor(name);
  }
}
</script>

<style scoped>
.fill {
  width: 100vw;
  height: calc(100vh - 52px);
}

@media only screen and (max-width: 781px) {
  .fill {
    height: calc(100vh - 56px - 28px);
  }
}
@media only screen and (max-width: 600px) {
  .fill {
    height: calc(200vh - 56px - 28px);
  }
}
</style>
