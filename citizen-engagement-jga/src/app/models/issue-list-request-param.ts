import { IssueState } from './issue';
import { PaginationStructure } from './pagination-structure';

export type BooleanString = "true" | "false";
                          
export type IncludeIssuesInfo = "" | "action" | "assignee" | "creator" | "issueType";

export class IssueListRequestParam {
  pagination : PaginationStructure;
  image? : BooleanString;
  search? : string;
  state? : IssueState[];
  include? : IncludeIssuesInfo[];
}
