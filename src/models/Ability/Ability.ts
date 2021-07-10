import { FlavorTextEntry } from "../Specie/FlavorText";
import { Generation } from "../Specie/Generation";
import { Name } from "../Specie/Name";
import { EffectEntry } from "./EffectEntry";
import { Pokemon } from "./Pokemon";

export interface Ability {
  effect_changes: any[];
  effect_entries: EffectEntry[];
  flavor_text_entries: FlavorTextEntry[];
  generation: Generation;
  id: number;
  is_main_series: boolean;
  name: string;
  names: Name[];
  pokemon: Pokemon[];
}
