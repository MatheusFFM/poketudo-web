import { Ability } from "./Ability";
import { Form } from "./Form";
import { GameIndice } from "./GameIndice";
import { Move } from "./Move";
import { Species } from "./Species";
import { Sprites } from "./Sprites";
import { Stat } from "./stat";
import { Type } from "./Type";

export interface Pokemon {
  abilities: Ability[];
  base_experience: number;
  forms: Form[];
  game_indices: GameIndice[];
  height: number;
  held_items: any[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: Move[];
  name: string;
  order: number;
  past_types: any[];
  species: Species;
  sprites: Sprites;
  stats: Stat[];
  types: Type[];
  weight: number;
}
