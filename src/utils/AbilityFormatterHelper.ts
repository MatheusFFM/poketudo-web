import { Pokemon } from "@/models/Pokemons/Pokemon";
import { Specie } from "@/models/Specie/Specie";
import { colors } from "@/models/Type/colors";
import { colorsCaracteristics } from "@/models/Pokemons/CaracteristicsEnum";
import { localeEnum } from "@/models/Locale/locales";
import { StatsEnum } from "./StatsEnum";
import { Ability } from "@/models/Ability/Ability";

export default class AbilityFormatterHelper {
  public getFlavorText(ability: Ability, language: string): string {
    if (ability.flavor_text_entries.length > 0) {
      language = this.formatLanguage(language);

      let allFlavors = ability.flavor_text_entries.filter(
        (t) => t.language.name === language
      );

      if (allFlavors.length === 0) {
        allFlavors = ability.flavor_text_entries.filter(
          (t) => t.language.name === "en"
        );
      }

      if (allFlavors.length === 0) {
        return "";
      }

      const flavor = allFlavors[allFlavors.length - 1];
      return flavor.flavor_text
        .replaceAll("POKéMON", "pokémon")
        .replaceAll("\f", " ");
    }
    return "";
  }

  public getName(ability: Ability, language: string): string {
    if (ability.names) {
      language = this.formatLanguage(language);

      for (const n of ability.names) {
        if (n.language.name === language) {
          return n.name;
        }
      }
      for (const n of ability.names) {
        if (n.language.name === "en") {
          return n.name;
        }
      }
    }
    return "";
  }

  public getGeneration(ability: Ability): string {
    const generation = ability.generation.name;
    const spplitedGeneration = generation.split("-");
    if (spplitedGeneration.length > 1) {
      spplitedGeneration[1] = spplitedGeneration[1].toUpperCase();
    }
    spplitedGeneration[0] =
      spplitedGeneration[0].charAt(0).toUpperCase() +
      spplitedGeneration[0].substring(1, spplitedGeneration[0].length);
    return spplitedGeneration.join(" ");
  }

  private formatLanguage(language: string): string {
    return language.length <= 2
      ? language
      : language
          .substr(0, 2)
          .concat("-")
          .concat(language.substr(2, language.length));
  }
}
