import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import cs from "@/locale/cs";
import de from "@/locale/de";
import en from "@/locale/en";
import es from "@/locale/es";
import fr from "@/locale/fr";
import it from "@/locale/it";
import jaHrkt from "@/locale/ja";
import ko from "@/locale/ko";
import ptBR from "@/locale/pt-BR";
import zhHans from "@/locale/zh-Hans";
import zhHant from "@/locale/zh-Hant";

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
    locales: { cs, de, en, es, fr, it, jaHrkt, ko, ptBR, zhHans, zhHant },
    current: "en",
  },
});
