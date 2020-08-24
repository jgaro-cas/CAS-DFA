import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { IssueType } from "src/app/models/issue-type";
import { environment } from "../../../environments/environment";
import { PaginationStructure } from 'src/app/models/pagination-structure';

@Injectable({
  providedIn: 'root'
})
export class IssueTypeService {

  constructor(private http : HttpClient) { }

  loadAllIssueTypes(params : PaginationStructure) : Observable<IssueType[]>{
    return this.http.get<IssueType[]>(`${environment.apiUrl}/issueTypes?${params.getSimpleRequest()}`);
  }

  createIssueType(issueTypeDefinition : IssueType) : Observable<IssueType>{
    return this.http.post<IssueType>(`${environment.apiUrl}/issueTypes`, issueTypeDefinition);
  }

  loadSingleIssueType(id : string) : Observable<IssueType>{
    return this.http.get<IssueType>(`${environment.apiUrl}/issueTypes/${id}`);
  }

  UpdateIssueType(issueTypeDefinition : IssueType, id : string) : Observable<IssueType>{
    return this.http.patch<IssueType>(`${environment.apiUrl}/issueTypes/${id}`, issueTypeDefinition);
  }
  
  deleteIssueType(id : string) : Observable<any>{
    return this.http.delete<any>(`${environment.apiUrl}/issueTypes/${id}`);
  }

}
