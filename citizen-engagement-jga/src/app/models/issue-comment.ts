import { User } from './user';

export class IssueComment {
  author?: User;
  authorHref : string;
  createdAt : Date;
  id : string;
  text : string;
}
