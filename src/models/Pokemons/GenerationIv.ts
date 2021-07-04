import { DiamondPearl } from "./DiamondPearl";
import { HeartgoldSoulsilver } from "./HeartgoldSoulsilver";
import { Platinum } from "./Platinum";

export interface GenerationIv {
  "diamond-pearl": DiamondPearl;
  "heartgold-soulsilver": HeartgoldSoulsilver;
  platinum: Platinum;
}
