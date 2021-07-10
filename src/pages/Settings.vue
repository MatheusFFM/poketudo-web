<template>
  <v-container>
    <v-expansion-panels v-model="panel" multiple>
      <v-expansion-panel>
        <v-expansion-panel-header class="py-5">
          {{ $vuetify.lang.t(`$vuetify.SettingsPage.Language`) }}
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <ChangeLocation />
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ChangeLocation from "@/components/Settings/ChangeLocation.vue";
import { settingsEnum } from "@/models/Settings/settings";

@Component({
  components: { ChangeLocation },
})
export default class Settings extends Vue {
  private settingsEnum = settingsEnum;
  private panel: number[] = [];

  private mounted() {
    const counter = [];
    for (let i = 0; i < settingsEnum.settings.length; i++) {
      counter.push(i);
    }
    this.panel = counter;
  }
}
</script>
