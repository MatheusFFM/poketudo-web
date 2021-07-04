import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

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
});
