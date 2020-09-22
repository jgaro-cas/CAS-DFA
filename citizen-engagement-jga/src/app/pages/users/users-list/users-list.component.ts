import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { UsersManagementService } from 'src/app/api/services/users-management.service';
import { PaginationStructure } from 'src/app/models/pagination-structure';
import { User } from 'src/app/models/user';
import { faUser,faUserEdit, faPhoneAlt, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { Router } from '@angular/router';



@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  faUser = faUser;
  faUserEdit = faUserEdit;
  faPhoneAlt = faPhoneAlt;
  faUserPlus = faUserPlus;

  userList : User[];
  public paginationLocale = new PaginationStructure;

  @ViewChild(MatPaginator) paginator : MatPaginator;

  constructor(private userManagementService : UsersManagementService, private router: Router) { }

  ngOnInit(): void {
      this.paginationLocale.page = 1;
      this.paginationLocale.pageSize = 2;
  }

  ngAfterViewInit(){
    this.paginator.color = "accent";
    this.paginator.length = 5;
    this.paginator.pageSize = 5;
    this.paginator.pageSizeOptions = [2, 5, 10, 20, 50];
    this.paginator.page.subscribe({
      next : () => {this.paginationLocale.page = this.paginator.pageIndex + 1;
                    this.paginationLocale.pageSize = this.paginator.pageSize;
                    this.loadUserListWithPagination(this.paginationLocale);
      }
    })
  }

  loadUserListWithPagination(pagination : PaginationStructure){
    this.userManagementService.loadAllUsers(pagination).subscribe({
      next : (result) => {this.paginator.length = parseInt(result.headers.get("pagination-total"));
                          this.userList = result.body;
                        },
      error : (error) => console.log(error)
    });
  
  }

  getUserPresentation(user : User){
    return user.firstname + " " + user.lastname;
  }

  getUserPhone(user : User){
    return user.phone;
  }

  getClassIcon(user : User){
    let iconClass = "";
    iconClass += user.roles.indexOf("citizen") > -1 ? "citizenIcon " : "";
    iconClass += user.roles.indexOf("staff") > -1 ? "staffIcon " : "";
    return iconClass;
  }

  getUserName(user : User){
    return ` (${user.name})`;
  }

  jumpToUserEdition(user: User){
    this.router.navigate(["/Accueil/user-page"], {state: {id:1, user: user}});
  }

  jumpToUserCreation(){
    ;
  }
}
