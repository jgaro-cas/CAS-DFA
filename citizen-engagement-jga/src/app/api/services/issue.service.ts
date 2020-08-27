import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IssueListRequestParam, IncludeIssuesInfo } from 'src/app/models/issue-list-request-param';
import { Observable } from 'rxjs';
import { Issue } from 'src/app/models/issue';
import { environment } from 'src/environments/environment';
import { IssueSeachListRequestParam } from 'src/app/models/issue-seach-list-request-param';
import { IssueActionsRequest } from 'src/app/models/issue-actions-request';
import { ActionStructure } from 'src/app/models/action-structure';
import { CommentsRequest } from 'src/app/models/comments-request';
import { CommentStructure } from 'src/app/models/comment-structure';

@Injectable({
  providedIn: 'root'
})
export class IssueService {

  constructor(private http : HttpClient) { }

  loadAllIssues(params : IssueListRequestParam) : Observable<Issue[]>{
    let stateParam : string;
    let includeParam : string;
    let requestString  : string = `?${params.pagination.getIssueRequest()}`;


    if (params.state !== undefined && params.state.length > 0 && params.state[0].length > 0) {
      for (const state of params.state) {
        stateParam = stateParam + `&state=${state}`;
      }
    } else {
      stateParam = "";
    }

    if (params.include !== undefined && params.include.length > 0 && params.include[0].length > 0) {
      for (const include of params.include) {
        includeParam = includeParam + `&include=${includeParam}`;
      }
    } else {
      includeParam = "";
    }

    requestString += (params.image !== undefined ? params.image : "");
    requestString += (params.search !== undefined ? params.search : "");

    requestString += stateParam;
    requestString += includeParam;

    return this.http.get<Issue[]>(`${environment.apiUrl}/issues${requestString}`);
  }

  createNewIssue(param : Issue) : Observable<Issue>{

    return this.http.post<Issue>(`${environment.apiUrl}/issues`, param);
  }

  // Not yet finished
  searchIssue(param :IssueSeachListRequestParam) : Observable<Issue[]>{
    return this.http.post<Issue[]>(`${environment.apiUrl}/issues/searches`, param);
  }

  loadSpecificIssue(id : string, param? : IncludeIssuesInfo[]) : Observable<Issue>{
    let includeParam : string;

    if (param !== undefined && param.length > 0 && param[0].length > 0) {
      for (const include of param) {
        if (includeParam !== undefined) {
          includeParam += `&include=${includeParam}`;
        } else {
          includeParam = `?include=${includeParam}`;
        } 
      }
    } else {
      includeParam = "";
    }

    return this.http.get<Issue>(`${environment.apiUrl}/issues/${id}${includeParam}`);
  }

  updateIssue(id : string, param : Issue) : Observable<Issue>{

    return this.http.patch<Issue>(`${environment.apiUrl}/issues/${id}`, param);
  }

  deleteIssue(id : string) : Observable<any>{
    return this.http.delete<string>(`${environment.apiUrl}/issues/${id}`);
  }

  loadIssueActions(id : string, param : IssueActionsRequest) : Observable<ActionStructure[]>{
    let includeParam : string;

    if (param.include !== undefined && param.include.length > 0 && param.include[0].length > 0) {
      for (const include of param.include) {
        includeParam = includeParam + `&include=${includeParam}`;
      }
    } else {
      includeParam = "";
    }


    return this.http.get<ActionStructure[]>(`${environment.apiUrl}/issues/${id}/actions?${param.pagination.getActionRequest()}${includeParam}`)
  }

  createIssueAction(id : string, param : ActionStructure) : Observable<ActionStructure>{
    return this.http.post<ActionStructure>(`${environment.apiUrl}/issues/${id}/actions`, param);
  }

  loadIssueComment(id : string, param : CommentsRequest) : Observable<string[]>{
    let includeParam : string = "";

    if (param.include !== undefined && param.include.length > 0 && param.include[0].length > 0) {
      console.log(param.include);
      for (const include of param.include) {
        includeParam = includeParam + `&include=${include}`;
      }
    } else {
      includeParam = "";
    }

    return this.http.get<string[]>(`${environment.apiUrl}/issues/${id}/comments?${param.pagination.getSimpleRequest()}${includeParam}`)
  }

  createIssueComment(id : string, param : CommentStructure) : Observable<string>{
    return this.http.post<string>(`${environment.apiUrl}/issues/${id}/comments`, param);
  }
}
