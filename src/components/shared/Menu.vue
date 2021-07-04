<template>
  <v-app-bar app color="primary" flat>
    <v-tabs
      centered
      class="ml-n9"
      color="secondary"
      slider-color="accentSecondary"
    >
      <v-tab v-for="link in links" :key="link.name" :to="getPath(link.path)">
        <v-router-link>{{ link.name }}</v-router-link>
      </v-tab>
    </v-tabs>
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { RouteRecordPublic } from "vue-router";
import router from "../../router";

@Component
export default class Menu extends Vue {
  public links: RouteRecordPublic[] = router.getRoutes();

  private getPath(path: string) {
    return path || "/";
  }
}
</script>
