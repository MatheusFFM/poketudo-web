<template>
  <div>
    {{ pokemon.name }}
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Pokemon } from "@/models/Pokemons/Pokemon";

@Component
export default class PokemonCard extends Vue {
  @Prop()
  public pokemon!: Pokemon;
}
</script>
