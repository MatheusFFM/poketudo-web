<template>
  <v-app-bar app color="primary" flat>
    <v-tabs centered class="ml-n9" color="secondary">
      <v-tab
        v-for="link in linksMenu"
        :key="link.name"
        :to="getPath(link.path)"
      >
        {{ link.name }}
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

  public get linksMenu(): RouteRecordPublic[] {
    return this.links.filter((l) => (l.props as never)["default"]["menu"]);
  }

  private getPath(path: string) {
    return path || "/";
  }
}
</script>
