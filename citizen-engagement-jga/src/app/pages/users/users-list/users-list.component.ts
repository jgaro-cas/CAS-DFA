import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { UsersManagementService } from 'src/app/api/services/users-management.service';
import { PaginationStructure } from 'src/app/models/pagination-structure';
import { User } from 'src/app/models/user';


@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  userList : User[];
  public paginationLocale = new PaginationStructure;

  @ViewChild(MatPaginator) paginator : MatPaginator;

  constructor(private userManagementService : UsersManagementService) { }

  ngOnInit(): void {
      this.paginationLocale.page = 1;
      this.paginationLocale.pageSize = 2;
  }

  ngAfterViewInit(){
    this.paginator.color = "accent";
    this.paginator.length = 5;
    this.paginator.pageSize = 2;
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
}
