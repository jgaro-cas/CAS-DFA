import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Issue } from 'src/app/models/issue';
import { PaginationStructure } from 'src/app/models/pagination-structure';

@Component({
  selector: 'app-issues-list',
  templateUrl: './issues-list.component.html',
  styleUrls: ['./issues-list.component.scss']
})
export class IssuesListComponent implements OnInit {

  issueList: Issue[];
  sortAscending : boolean = true;
  public paginationLocale = new PaginationStructure;

  @ViewChild(MatPaginator) paginator : MatPaginator;


  constructor() { }

  ngOnInit(): void {
  }

}
