<template>
  <transition name="slide">
    <PokemonInfos
      v-if="pokemon && specie"
      :pokemon="pokemon"
      :specie="specie"
      :last="previus"
      :next="next"
      @update="reload"
    />
    <div class="fill" v-else>
      <LoadingPokeball />
    </div>
  </transition>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { PokemonListStateActionTypes } from "@/store/pokemonListStore/actions";
import { PokemonListGetterTypes } from "@/store/pokemonListStore/getters";
import { StoreNamespaces } from "@/store/namespaces";
import PokemonInfos from "@/components/Pokemon/PokemonInfos.vue";
import LoadingPokeball from "@/components/shared/LoadingPokeball.vue";
import { PokemonsList } from "@/models/PokemonsList/PokemonsList";
import { Pokemon } from "@/models/Pokemons/Pokemon";
import { Specie } from "@/models/Specie/Specie";
import { getPokemonsByName } from "@/service/pokemons";
import { getSpecieByName } from "@/service/species";
import router from "@/router";

const pokemonListNamespace = namespace(StoreNamespaces.POKEMON_LIST);

@Component({
  components: {
    PokemonInfos,
    LoadingPokeball,
  },
})
export default class Pokemons extends Vue {
  public pokemon: Pokemon | null = null;
  public specie: Specie | null = null;
  public pokemonName: string | null = null;
  public previus: string | null = null;
  public next: string | null = null;
  public xDown: number | null = null;
  public yDown: number | null = null;
  public handler: ((e: any) => void) | undefined;

  @pokemonListNamespace.Getter(PokemonListGetterTypes.FETCH_POKEMONS_LIST)
  public pokemonListOnStore!: PokemonsList;

  @pokemonListNamespace.Action(PokemonListStateActionTypes.LOAD_POKEMON_LIST)
  public fetchStore!: () => Promise<PokemonsList | null>;

  private get pokemonRoute() {
    return this.$route.params.name;
  }

  private mounted() {
    this.loadPokemon();
  }

  private created() {
    document.addEventListener("touchstart", this.handleTouchStart, false);
    document.addEventListener("touchmove", this.handleTouchMove, false);
    document.addEventListener("keydown", this.handleKeyboard);
  }
  private beforeDestroy() {
    document.removeEventListener("keydown", this.handleKeyboard);
    document.removeEventListener("touchstart", this.handleTouchStart, false);
    document.removeEventListener("touchmove", this.handleTouchMove, false);
  }

  private goTo(pokemon: string) {
    router.push({ name: "pokemon", params: { name: pokemon } });
  }

  @Watch("pokemonRoute")
  private async loadPokemon() {
    window.scrollTo(0, 0);
    this.pokemonName = this.pokemonRoute;
    if (!this.pokemonListOnStore) {
      await this.fetchStore();
    }
    if (this.pokemonName) {
      const pokemonFetched = await getPokemonsByName(this.pokemonName);
      if (pokemonFetched) {
        this.pokemon = pokemonFetched;
        this.loadSpecie();
        this.previus = await this.loadPreviusPokemon();
        this.next = await this.loadNextPokemon();
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

  private async loadPreviusPokemon(): Promise<string | null> {
    if (!this.pokemonListOnStore) {
      this.fetchStore();
    }

    if (this.pokemonListOnStore && this.pokemonName) {
      const index = this.pokemonListOnStore.results.findIndex(
        (r) => r.name === this.pokemonName
      );
      return index <= 0
        ? this.pokemonListOnStore.results[
            this.pokemonListOnStore.results.length - 1
          ].name
        : this.pokemonListOnStore.results[index - 1].name;
    }

    return null;
  }

  private async loadNextPokemon(): Promise<string | null> {
    if (!this.pokemonListOnStore) {
      this.fetchStore();
    }

    if (this.pokemonListOnStore && this.pokemonName) {
      const index = this.pokemonListOnStore.results.findIndex(
        (r) => r.name === this.pokemonName
      );
      return index >= this.pokemonListOnStore.results.length - 1
        ? this.pokemonListOnStore.results[0].name
        : this.pokemonListOnStore.results[index + 1].name;
    }

    return null;
  }

  private async reload(newPokemon: string) {
    if (newPokemon) {
      this.pokemonName = newPokemon;
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
      this.loadPokemon();
    }
  }

  private handleKeyboard(e: any) {
    if (this.pokemonName !== this.next && this.pokemonName !== this.previus) {
      if (e.code === "ArrowRight") {
        if (this.next) {
          this.goTo(this.next);
        }
      }
      if (e.code === "ArrowLeft") {
        if (this.previus) {
          this.goTo(this.previus);
        }
      }
    }
  }

  private getTouches(e: any) {
    return e.touches || e.originalEvent.touches;
  }

  private handleTouchStart(e: any) {
    const firstTouch = this.getTouches(e)[0];
    this.xDown = firstTouch.clientX;
    this.yDown = firstTouch.clientY;
  }

  private handleTouchMove(e: any) {
    if (!this.xDown || !this.yDown) {
      return;
    }

    const xUp = e.touches[0].clientX;
    const yUp = e.touches[0].clientY;

    const xDiff = this.xDown - xUp;
    const yDiff = this.yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      /*most significant*/
      if (xDiff > 9) {
        if (this.next) {
          this.goTo(this.next);
        }
      } else if (xDiff < -9) {
        if (this.previus) {
          this.goTo(this.previus);
        }
      }
    } else {
      if (yDiff > 0) {
        /* up swipe */
      } else {
        /* down swipe */
      }
    }
    /* reset values */
    this.xDown = null;
    this.yDown = null;
  }
}
</script>
<style scoped>
.fill {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
