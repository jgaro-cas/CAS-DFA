import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';
import { Issue } from 'src/app/models/issue';
import { IssueListRequestParam } from 'src/app/models/issue-list-request-param';

@Injectable({
  providedIn: 'root'
})
export class MeService {
  constructor(private http : HttpClient) {}

  loadMyInformations() : Observable<User>{
    return this.http.get<User>(`${environment.apiUrl}/me`);
  }

  loadMyIssues(params : IssueListRequestParam) : Observable<Issue[]>{
    let stateParam : string = "";
    let includeParam : string = "";
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

    return this.http.get<Issue[]>(`${environment.apiUrl}/issues?${requestString}`);
      }
}
