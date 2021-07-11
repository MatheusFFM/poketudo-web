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
            <span class="font-weight-bold mb-3 subtitle-1">
              {{ $vuetify.lang.t(`$vuetify.Stats.hp`) }}:
            </span>
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
            <span class="font-weight-bold mb-3 subtitle-1">
              {{ $vuetify.lang.t(`$vuetify.Stats.attack`) }}:
            </span>
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
            <span class="font-weight-bold mb-3 subtitle-1">
              {{ $vuetify.lang.t(`$vuetify.Stats.defense`) }}:
            </span>
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
            <span class="font-weight-bold mb-3 subtitle-1">
              {{ $vuetify.lang.t(`$vuetify.Stats.specialAttack`) }}:
            </span>
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
            <span class="font-weight-bold mb-3 subtitle-1">
              {{ $vuetify.lang.t(`$vuetify.Stats.specialDefense`) }}:
            </span>
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
            <span class="font-weight-bold mb-3 subtitle-1">
              {{ $vuetify.lang.t(`$vuetify.Stats.speed`) }}:
            </span>
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
            <span class="font-weight-bold mb-3 subtitle-1">
              {{ $vuetify.lang.t(`$vuetify.Average`) }}:
            </span>
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
            <span class="font-weight-bold mb-3 subtitle-1">
              {{ $vuetify.lang.t(`$vuetify.Total`) }}:
            </span>
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
      <v-col cols="12" md="6" class="px-10 mb-sm-0 pt-md-7 pb-14">
        <v-row
          class="card-abilities mt-sm-0 pt-sm-0"
          :class="{ hide: abilities.length === 0 }"
        >
          <v-col
            cols="12"
            class="pr-14 d-flex flex-column justify-center align-end"
            v-if="$vuetify.breakpoint.smAndUp"
          >
            <span class="display-3 font-weight-bold">{{
              capitalizeName(pokemon.name)
            }}</span>
          </v-col>
          <v-col cols="12" class="d-flex flex-column align-center mt-sm-0">
            <v-card elevation="3" shaped class="mt-6 pb-7">
              <v-card-title
                class="d-flex flex-column align-center"
                :style="{
                  'background-color': mainColor,
                  color: 'white',
                }"
              >
                <span class="font-weight-bold"> Habilidades </span>
              </v-card-title>
              <v-tabs centered :background-color="mainColor" v-model="tab">
                <v-tab
                  class="d-flex flex-column align-center"
                  v-for="ability in abilities"
                  :key="ability.id"
                >
                  {{ getName(ability) }}
                </v-tab>
              </v-tabs>

              <v-tabs-items v-model="tab">
                <v-tab-item v-for="ability in abilities" :key="ability.id">
                  <v-card flat>
                    <v-card-text class="px-6 pt-6 pb-3">
                      <v-row>
                        <v-col
                          cols="12"
                          class="info-text d-flex flex-row align-start"
                        >
                          <span
                            class="font-weight-bold pr-2"
                            :style="{
                              color: secundaryColor,
                            }"
                            >{{ $vuetify.lang.t(`$vuetify.Name`) }}:
                          </span>
                          {{ getName(ability) }}</v-col
                        >
                        <v-col
                          cols="12"
                          class="info-text d-flex flex-row align-start"
                        >
                          <span
                            class="font-weight-bold pr-2"
                            :style="{
                              color: secundaryColor,
                            }"
                          >
                            {{
                              $vuetify.lang.t(`$vuetify.Pokemon.Generation`)
                            }}:
                          </span>
                          {{ getGeneration(ability) }}</v-col
                        >
                        <v-col
                          cols="12"
                          class="info-text d-flex flex-row align-start"
                          >{{ getFlavorText(ability) }}</v-col
                        >
                        <v-col cols="12">
                          <v-chip
                            class="mx-3 px-2"
                            text-color="white"
                            :color="mainColor"
                          >
                            {{ $vuetify.lang.t(`$vuetify.Ability.Slot`) }} #{{
                              getAbilitySlot(ability.name)
                            }}
                          </v-chip>
                          <v-chip
                            class="mx-3 px-2"
                            text-color="white"
                            :color="getCaracteristicColor('hidden')"
                            v-if="getAbilityHidden(ability.name)"
                          >
                            {{ $vuetify.lang.t(`$vuetify.Ability.Hidden`) }}
                          </v-chip>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-card>
                </v-tab-item>
              </v-tabs-items>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { Pokemon } from "@/models/Pokemons/Pokemon";
import { Specie } from "@/models/Specie/Specie";
import { Ability } from "@/models/Ability/Ability";
import { getAbilityByName } from "@/service/abilities";
import PokemonFormatterHelper from "@/utils/PokemonFormatterHelper";
import AbilityFormatterHelper from "@/utils/AbilityFormatterHelper";

@Component
export default class PokemonDetails extends Vue {
  @Prop()
  public pokemon!: Pokemon;
  @Prop()
  public specie!: Specie;

  private tab = null;

  private abilities: Ability[] = [];

  private pokemonFormatterHelper = new PokemonFormatterHelper();

  private abilityFormatterHelper = new AbilityFormatterHelper();

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
  private getCaracteristicColor(name: string): string {
    return this.pokemonFormatterHelper.getCaracteristicColor(name);
  }

  private async mounted(): Promise<void> {
    this.getAbilities();
  }

  private getGeneration(ability: Ability): string {
    return this.abilityFormatterHelper.getGeneration(ability);
  }

  private getName(ability: Ability): string {
    return this.abilityFormatterHelper.getName(
      ability,
      this.$vuetify.lang.current
    );
  }

  private getFlavorText(ability: Ability): string {
    return this.abilityFormatterHelper.getFlavorText(
      ability,
      this.$vuetify.lang.current
    );
  }

  @Watch("pokemon")
  private async getAbilities(): Promise<void> {
    this.abilities = [];
    this.pokemon.abilities.forEach(async (a) => {
      const response = await getAbilityByName(a.ability.name);
      if (response) {
        this.abilities.push(response);
      }
    });
  }

  private capitalizeName(name: string, uniqueName = false): string {
    return this.pokemonFormatterHelper.capitalizeName(
      this.specie,
      name,
      this.$vuetify.lang.current,
      uniqueName
    );
  }

  private getAbilitySlot(name: string): number {
    return (
      this.pokemon.abilities.find((a) => a.ability.name === name)?.slot || 0
    );
  }

  private getAbilityHidden(name: string): boolean {
    return (
      this.pokemon.abilities.find((a) => a.ability.name === name)?.is_hidden ||
      false
    );
  }
}
</script>

<style scoped>
.fill {
  width: 100vw;
  height: calc(100vh - 52px);
}

.info-text {
  font-size: 18px;
}

.hide {
  display: none !important;
}

.card-abilities {
  margin-top: 25px;
  font-size: 21px;
  text-align: center;

  -webkit-animation: fadein 1.5s; /* Safari, Chrome and Opera > 12.1 */
  -moz-animation: fadein 1.5s; /* Firefox < 16 */
  -ms-animation: fadein 1.5s; /* Internet Explorer */
  -o-animation: fadein 1.5s; /* Opera < 12.1 */
  animation: fadein 1.5s;
}

@keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Firefox < 16 */
@-moz-keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Safari, Chrome and Opera > 12.1 */
@-webkit-keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
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
