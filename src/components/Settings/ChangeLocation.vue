<template>
  <v-card flat>
    <v-card-text>
      <v-container fluid class="ma-0">
        <v-row>
          <v-col cols="12">
            <span class="text--secondary">
              {{ $vuetify.lang.t(`$vuetify.SettingsPage.LanguageTip`) }}
            </span>
          </v-col>
          <v-col
            cols="12"
            sm="4"
            md="3"
            v-for="locale in locales"
            :key="locale.name"
          >
            <div class="d-flex flex-column align-start justify-start">
              <v-checkbox
                color="secondary"
                v-model="locale.active"
                :label="locale.view"
                @click="changeLocation(locale)"
              />
              <v-chip color="accent" small v-if="!locale.completed">
                {{ $vuetify.lang.t(`$vuetify.SettingsPage.Incomplete`) }}
              </v-chip>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { localeEnum } from "@/models/Locale/locales";
import { Locale } from "@/models/Locale/Locale";

@Component
export default class ChangeLocation extends Vue {
  private locales: Locale[] = [];

  private mounted() {
    const locales = localeEnum.locales.sort((a, b) => {
      return a.completed === b.completed
        ? a.name.localeCompare(b.name)
        : a.completed
        ? -1
        : 1;
    });
    for (const locale of locales) {
      this.locales.push({
        name: locale.name,
        view: locale.view,
        active: this.$vuetify.lang.current === locale.name,
        completed: locale.completed,
      });
    }
  }

  private changeLocation(locale: Locale) {
    if (locale.active) {
      localStorage.setItem("$locale", locale.name);
      this.locales.forEach((l) => (l.active = l.name === locale.name));
      this.$vuetify.lang.current = locale.name;
    } else {
      this.locales.forEach((l) => (l.active = l.name === "en"));
    }
  }
}
</script>
