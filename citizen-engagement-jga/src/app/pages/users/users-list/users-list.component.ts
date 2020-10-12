import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { UsersManagementService } from 'src/app/api/services/users-management.service';
import { PaginationStructure, SortUser } from 'src/app/models/pagination-structure';
import { User } from 'src/app/models/user';
import { faUser,faUserEdit, faPhoneAlt, faUserPlus, faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";
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
  faAngleUp = faAngleUp;
  faAngleDown = faAngleDown;
  

  userList : User[];
  sortAscending : boolean = true;
  public paginationLocale = new PaginationStructure;

  @ViewChild(MatPaginator) paginator : MatPaginator;

  constructor(private userManagementService : UsersManagementService, private router: Router) { }

  ngOnInit(): void {
      this.paginationLocale.page = 1;
      this.paginationLocale.pageSize = 5;
      this.userManagementService.loadAllUsers(this.paginationLocale).subscribe({
        next : (result) => {this.userList = result.body;
                            this.paginationLocale.length = parseInt(result.headers.get("pagination-total"));
                            },
        error : (error)=> console.log("Erreur", error)
        })
  }

  ngAfterViewInit(){
    this.paginator.color = "accent";
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

  getRoleStaff(user: User){
    return user.roles.indexOf("staff") > -1 ? true : false;
  }

  getRoleCitizen(user: User){
    return user.roles.indexOf("staff") > -1 ? true : false;
  }

  jumpToUserEdition(user: User){
    this.router.navigate([`/Accueil/users/${user.id}`]);
  }

  jumpToUserCreation(){
    this.router.navigate([`/Accueil/users/new`]);
  }

  changeSelectValue(sortCond : SortUser){
    // impossible de générer un string de type sortUser à la volée pour 
    // les option asc/desc par boutton... 
    // Du coup entrée manuelle des version avec ou sans " - "
    this.paginationLocale.sortUser = sortCond;
    this.loadUserListWithPagination(this.paginationLocale);    
  }
}
