import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';
import { PaginationStructure } from 'src/app/models/pagination-structure';

@Injectable({
  providedIn: 'root'
})
export class UsersManagementService {

  constructor(private http : HttpClient) { }

  loadAllUsers(params : PaginationStructure) : Observable<User[]>{
    return this.http.get<User[]>(`${environment.apiUrl}/users?${params.getUserRequest()}`);
  }

  createUser(userDefinition : User) : Observable<User>{
    return this.http.post<User>(`${environment.apiUrl}/users`, userDefinition);
  }

  loadSingleUser(id : string) : Observable<User>{
    return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
  }

  updateUser(id : string, userDefinition : User) : Observable<User>{
    return this.http.patch<User>(`${environment.apiUrl}/users/${id}`, userDefinition);
  }
}
