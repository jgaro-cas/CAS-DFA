export type SortUser =  "name" | "-name" |
                        "firstname" | "-firstname" |
                        "lastname" | "-lastname" |
                        "phone" | "-phone";

export type SortIssue =   "createdAt" | "-createdAt" |
                          "updatedAt" | "-updatedAt" |
                          "state" | "-state";

export type SortAction = "createdAt" | "-createdAt" |
                          "type" | "-type";

export class PaginationStructure {
  page : number;
  pageSize : number;
  sortUser? : SortUser;
  sortIssue? : SortIssue;
  sortActions? : SortAction;

//  readonly simpleRequest : string = this.generateSimpleRequest();
//  readonly userRequest : string = this.generateUserRequest();
//  readonly issueRequest : string = this.generateIssueRequest();
//  readonly actionRequest : string = this.generateActionRequest();

  getSimpleRequest() : string {
    this.page = this.page < 1 ? 1 : this.page;
    this.pageSize = this.pageSize < 1 ? 1 : (this.pageSize > 50 ? 50 : this.pageSize);
    return `page=${this.page}&pageSize=${this.pageSize}`;
  }

  getUserRequest(){
    let stringRequest = this.getSimpleRequest();
    stringRequest += this.sortUser !== undefined ? `&sort=${this.sortUser}` : "";
    return stringRequest;
  }

  getIssueRequest(){
    let stringRequest = this.getSimpleRequest();
    stringRequest += this.sortIssue !== undefined ? `&sort=${this.sortIssue}` : "";
    return stringRequest;
  }

  getActionRequest(){
    let stringRequest = this.getSimpleRequest();
    stringRequest += this.sortActions !== undefined ? `&sort=${this.sortActions}` : "";
    return stringRequest;
  }
}
