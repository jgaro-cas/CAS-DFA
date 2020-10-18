import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { IssueService } from 'src/app/api/services/issue.service';
import { Issue } from 'src/app/models/issue';
import { IssueListRequestParam } from 'src/app/models/issue-list-request-param';
import { PaginationStructure } from 'src/app/models/pagination-structure';
import { faSearch } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-issues-list',
  templateUrl: './issues-list.component.html',
  styleUrls: ['./issues-list.component.scss']
})
export class IssuesListComponent implements OnInit {

  faSearch = faSearch;
  issueList: Issue[];
  sortAscending : boolean = true;
  public issueRequestParam = new IssueListRequestParam;

  @ViewChild(MatPaginator) paginator : MatPaginator;


  constructor(private issueService: IssueService, private router : Router) { }

  ngOnInit(): void {
    this.issueRequestParam.pagination = new PaginationStructure;
    this.issueRequestParam.pagination.page = 1;
    this.issueRequestParam.pagination.pageSize = 5;
    this.issueService.loadAllIssues(this.issueRequestParam).subscribe({
      next: (result) => {this.issueList = result.body;
                          this.issueRequestParam.pagination.length = parseInt(result.headers.get("pagination-total"));
                        },
      error: (error) => console.log("Erreur", error)
        
    })
  }

  ngAfterViewInit(){
    this.paginator.color = "accent";
    this.paginator.page.subscribe({
      next : () => {this.issueRequestParam.pagination.page = this.paginator.pageIndex + 1;
                    this.issueRequestParam.pagination.pageSize = this.paginator.pageSize;
                    this.loadIssueList();
                    },
      error : (error) => console.log("Erreur", error)
    })
  }

  loadIssueList(){
    this.issueService.loadAllIssues(this.issueRequestParam).subscribe({
      next: (result) => {this.issueList = result.body;
                          this.paginator.length = parseInt(result.headers.get("pagination-total"));
                        },
      error: (error) => console.log("Erreur", error)
    })

  }

  jumpToIssueCreation(){
    ;
  }

  jumpToIssueEdition(issue : Issue){
    this.router.navigate([`/Accueil/issues/${issue.id}`]);;
  }

}
