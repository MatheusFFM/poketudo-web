import { MoveLearnMethod } from "./MoveLearnMethod";
import { VersionGroup } from "./VersionGroup";

export interface VersionGroupDetail {
  level_learned_at: number;
  move_learn_method: MoveLearnMethod;
  version_group: VersionGroup;
}
