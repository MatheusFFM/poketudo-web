import { Language } from "./Language";
import { Version } from "./Version";

export interface FlavorTextEntry {
  flavor_text: string;
  language: Language;
  version: Version;
}
