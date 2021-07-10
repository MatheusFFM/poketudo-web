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
export default class App extends Vue {
  private mounted() {
    const locale = localStorage.getItem("$locale");
    if (locale) {
      this.$vuetify.lang.current = locale;
    }
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  border: 0;
  vertical-align: baseline;
}
</style>
