import { Component, OnInit, ViewChild } from '@angular/core';
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
  public pagination = new PaginationStructure;



  constructor(private userManagementService : UsersManagementService) { }

  ngOnInit(): void {
      this.pagination.page = 1;
      this.pagination.pageSize = 2;
//    this.paginator.color = "accent";
//    this.paginator.pageSize = 20;
//    this.paginator.pageSizeOptions = [2, 5, 10, 20, 50];
//    this.paginator.page.subscribe({
//      next : () => {this.pagination.page = this.paginator.pageIndex;
//                    this.pagination.pageSize = this.paginator.pageSize;
//                    this.loadUserListWithPagination(this.pagination);
//      }
//    })
  }

  loadUserListWithPagination(pagination : PaginationStructure){
    this.userManagementService.loadAllUsers(this.pagination).subscribe({
      next: (result) => console.log(result),
      error: (error) => console.log(error)
    }) 
  }
}
