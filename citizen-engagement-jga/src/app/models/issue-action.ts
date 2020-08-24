import { type } from 'os';

export type ActionType = "start" | "reject" | "resolve";

export class IssueAction {
  readonly createdAt : Date;
  readonly id : string;
  readonly href : string;
  readonly issueHref : string;
  reason? : string;
  type : ActionType;
  readonly userHref : string;
}
