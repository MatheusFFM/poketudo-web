<template>
  <div>
    <v-checkbox
      v-for="locale in locales"
      :key="locale.name"
      v-model="locale.active"
      :label="locale.view"
      color="secondary"
      @click="changeLocation(locale)"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { localeEnum } from "@/locale/localeEnum";
import { Locale } from "@/models/Locale/Locale";

@Component
export default class ChangeLocation extends Vue {
  private locales: Locale[] = [];

  private mounted() {
    for (const locale of localeEnum.locales) {
      this.locales.push({
        name: locale.name,
        view: locale.view,
        active: this.$vuetify.lang.current === locale.name,
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
