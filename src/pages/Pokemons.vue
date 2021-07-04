<template>
  <div>
    <div>Pokemons</div>
    <div>Pokemons</div>
    <div>Pokemons</div>
    <div>Pokemons</div>
    <div>Pokemons</div>
    <div>Pokemons</div>
    <div>Pokemons</div>
    <div>Pokemons</div>
    <div>Pokemons</div>
    <div>Pokemons</div>
    <div>Pokemons</div>
    <div>Pokemons</div>
    <div>Pokemons</div>
    <div>Pokemons</div>
    <div>Pokemons</div>
    <div>Pokemons</div>
    <div>Pokemons</div>
    <div>Pokemons</div>
    <div>Pokemons</div>
    <div>Pokemons</div>
    <div>Pokemons</div>
    <div>Pokemons</div>
    <div>Pokemons</div>
    <div>Pokemons</div>
    <div>Pokemons</div>
    <div>Pokemons</div>
    <div>Pokemons</div>
    <div>Pokemons</div>
    <div>Pokemons</div>
    <div>Pokemons</div>
    <div>Pokemons</div>
    <div>Pokemons</div>
    <div>Pokemons</div>
    <div>Pokemons</div>
    <div>Pokemons</div>
    <div>Pokemons</div>
    <div>Pokemons</div>
    <div>Pokemons</div>
    <div>Pokemons</div>
    <div>Pokemons</div>
    <div>Pokemons</div>
    <div>Pokemons</div>
    <div>Pokemons</div>
    <div>Pokemons</div>
    <div>Pokemons</div>
    <div>Pokemons</div>
    <div>Pokemons</div>
    <div>Pokemons</div>
    <div>Pokemons</div>
    <div>Pokemons</div>
    <div>Pokemons</div>
    <div>Pokemons</div>
    <div>Pokemons</div>
    <div>Pokemons</div>
    <div>Pokemons</div>
    <div>Pokemons</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Pokemon } from "../models/Pokemons/Pokemon";
import { getPokemon } from "../service/pokemons";

@Component
export default class Home extends Vue {
  public pokemons: Pokemon[] = [];

  private async mounted() {
    const pokemon = await getPokemon(1);
    console.log(pokemon);
  }
}
</script>
