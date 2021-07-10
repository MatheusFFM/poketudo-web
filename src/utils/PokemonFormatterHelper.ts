import { Pokemon } from "@/models/Pokemons/Pokemon";
import { Specie } from "@/models/Specie/Specie";
import { colors } from "@/models/Type/colors";
import { colorsCaracteristics } from "@/models/Pokemons/CaracteristicsEnum";
import { localeEnum } from "@/models/Locale/locales";
export default class PokemonFormatterHelper {
  public formatPokedexNumber(pokedexNumber: number): string {
    let result = pokedexNumber.toString();
    while (result.length < 3) {
      result = "0".concat(result);
    }
    return result;
  }

  public capitalizeName(
    specie: Specie,
    name: string,
    language: string,
    uniqueName = false
  ): string {
    language = this.formatLanguage(language);

    if (!uniqueName) {
      if (specie.names) {
        for (const n of specie.names) {
          if (n.language.name === language) {
            return n.name;
          }
        }
        for (const n of specie.names) {
          if (n.language.name === "en") {
            return n.name;
          }
        }
      }
    }
    const spplitedName = name.split("-");
    const allUpperCase = ["GMAX"];
    spplitedName.map((n, index) => {
      if (allUpperCase.includes(n.toUpperCase())) {
        spplitedName[index] = n.toUpperCase();
      } else {
        spplitedName[index] = n.charAt(0).toUpperCase() + n.slice(1);
      }
    });
    return spplitedName.join(" ");
  }

  public getTypeColor(name: string): string {
    return (colors as never)[name];
  }

  public getCaracteristicColor(name: string): string {
    return (colorsCaracteristics as never)[name];
  }

  public capitalizeType(name: string): string {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  public getImg(pokemon: Pokemon): string {
    const other = pokemon.sprites.other;
    if (other.dream_world.front_default) {
      return other.dream_world.front_default;
    }
    const officialArtwork = "front_default";
    const jumpChars = 3;
    const otherString = JSON.stringify(other);
    const index = otherString.lastIndexOf(officialArtwork);
    const partialUrl = otherString.substring(
      index + jumpChars + officialArtwork.length,
      otherString.length
    );
    const indexSufix = partialUrl.indexOf('"');
    if (indexSufix === -1) {
      return require("@/assets/NoPokemon.png");
    }
    const url = partialUrl.substring(0, indexSufix);
    return url;
  }

  public getFlavorText(specie: Specie, language: string): string {
    if (specie.flavor_text_entries.length > 0) {
      language = this.formatLanguage(language);

      let allFlavors = specie.flavor_text_entries.filter(
        (t) => t.language.name === language
      );

      if (allFlavors.length === 0) {
        allFlavors = specie.flavor_text_entries.filter(
          (t) => t.language.name === "en"
        );
      }

      if (allFlavors.length === 0) {
        return "";
      }

      const flavor = allFlavors[Math.floor(Math.random() * allFlavors.length)];
      return flavor.flavor_text
        .replaceAll("POKéMON", "pokémon")
        .replaceAll("\f", " ");
    }
    return "";
  }

  public getGenus(specie: Specie, language: string): string {
    language = this.formatLanguage(language);
    return (
      specie.genera.find((g) => g.language.name === language)?.genus ||
      specie.genera.find((g) => g.language.name === "en")?.genus ||
      "Unknown"
    );
  }

  public getGeneration(specie: Specie): string {
    const generation = specie.generation.name;
    const spplitedGeneration = generation.split("-");
    if (spplitedGeneration.length > 1) {
      spplitedGeneration[1] = spplitedGeneration[1].toUpperCase();
    }
    spplitedGeneration[0] =
      spplitedGeneration[0].charAt(0).toUpperCase() +
      spplitedGeneration[0].substring(1, spplitedGeneration[0].length);
    return spplitedGeneration.join(" ");
  }

  public getHeight(height: number, language: string): string {
    let constant = 0.1;
    const locale = localeEnum.locales.find((l) => l.name === language);
    if (locale?.height) {
      constant = locale.height;
    }
    return Math.floor(height * constant * 100) / 100 + "";
  }

  public getWeight(weight: number, language: string): string {
    let constant = 0.1;
    const locale = localeEnum.locales.find((l) => l.name === language);
    if (locale?.weight) {
      constant = locale.weight;
    }
    return Math.floor(weight * constant * 100) / 100 + "";
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
