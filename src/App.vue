<template>
  <v-app>
    <Menu />

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Menu from "./components/shared/Menu.vue";

@Component({
  components: { Menu },
})
export default class App extends Vue {}
</script>
