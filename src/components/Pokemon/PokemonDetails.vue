<template>
  <div>
    <v-row class="fill">
      <v-col cols="12" sm="6"> </v-col>
      <v-col cols="12" sm="6"> </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Pokemon } from "@/models/Pokemons/Pokemon";
import { Specie } from "@/models/Specie/Specie";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class PokemonDetails extends Vue {
  @Prop()
  public pokemon!: Pokemon;
  @Prop()
  public specie!: Specie;
}
</script>

<style scoped>
.fill {
  width: 100vw;
  height: 100vh;
}
</style>
