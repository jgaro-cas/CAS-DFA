import { IssueType } from './issue-type';

export type ImageUrlType = ""; // Posibilité de mettre un contrôle du http et des extensions? utilisation de regexp?
export type IssueTypeReference = IssueType["href"] | IssueType["id"];
export type IssueState = "New" | "InProgress" | "rejected" | "resolved";

export class Issue {
  readonly assignedHref : string;
  readonly createdAt : Date;
  readonly creatorHref : string;
  description? : string;
  readonly href : string;
  readonly id : string;
  imageUrl? : string; // à changer par ImageUrlType si moyen de mettre des limitations
  additionalImagesUrl? : string[]; // à changer par ImageUrlType si moyen de mettre des limitations
  issueTypeHref : IssueTypeReference;
  location : {};
  readonly state : IssueState; 
  tags? : string[];
  readonly updatedAt :  Date;
  
}
