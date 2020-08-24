import { PaginationStructure } from './pagination-structure';

export type IncludeIssuesInfo = "action" | "assignee" | "creator" | "issueType";

// Create a mango DB querry operator
// Will not be implemented

export class IssueSeachListRequestParam {
  pagination : PaginationStructure;
  include : IncludeIssuesInfo;

}
