import { Result } from "./Result";

export interface PokemonsList {
  count: number;
  next: string;
  previous?: any;
  results: Result[];
}
