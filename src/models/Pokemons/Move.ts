import { VersionGroupDetail } from "./VersionGroupDetail";
import { Move2 } from "./Move2";

export interface Move {
  move: Move2;
  version_group_details: VersionGroupDetail[];
}
