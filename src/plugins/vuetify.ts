import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import en from "@/locale/en";
import pt from "@/locale/pt-BR";

Vue.use(Vuetify);

Vue.component("change-locale", {
  methods: {
    changeLocale(locale: string) {
      this.$vuetify.lang.current = "locale";
    },
  },
});

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#FEFEFE",
        secondary: "#78a8c0",
        tertiary: "#f0d8a8",
        text: "#484848",
        secondaryText: "#FEFEFE",
        accent: "#c04848",
        secondaryAccent: "FFDE00",
      },
    },
  },
  lang: {
    locales: { en, pt },
    current: "pt",
  },
});
