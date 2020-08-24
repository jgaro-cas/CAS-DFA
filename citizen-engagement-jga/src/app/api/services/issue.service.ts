import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IssueListRequestParam, IncludeIssuesInfo } from 'src/app/models/issue-list-request-param';
import { Observable } from 'rxjs';
import { Issue } from 'src/app/models/issue';
import { environment } from 'src/environments/environment';
import { IssueSeachListRequestParam } from 'src/app/models/issue-seach-list-request-param';

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

  loadSpecificIssue(id : string, param? : IncludeIssuesInfo[]){
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

}
