import { PaginationStructure } from './pagination-structure';

export type IncludeIssueActionType = "issue" | "user";

export class IssueActionsRequest {
  pagination : PaginationStructure;
  include : IncludeIssueActionType;

}
