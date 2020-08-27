export type ActionType = "start" | "reject" | "resolve";

export class ActionStructure {
  reason : string;
  type : ActionType;
}
