import { PaginationStructure } from './pagination-structure';

export type IncludeComment = "author";

export class CommentsRequest {
  pagination : PaginationStructure;
  include : IncludeComment[];
}
