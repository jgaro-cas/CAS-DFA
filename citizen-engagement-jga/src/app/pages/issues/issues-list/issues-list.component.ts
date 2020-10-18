import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { IssueService } from 'src/app/api/services/issue.service';
import { Issue } from 'src/app/models/issue';
import { IssueListRequestParam } from 'src/app/models/issue-list-request-param';
import { PaginationStructure } from 'src/app/models/pagination-structure';
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { latLng, MapOptions, tileLayer, marker,Marker } from 'leaflet';
import { defaultIcon } from "src/app/models/leaflet/default-marker";


@Component({
  selector: 'app-issues-list',
  templateUrl: './issues-list.component.html',
  styleUrls: ['./issues-list.component.scss']
})
export class IssuesListComponent implements OnInit {

  faSearch = faSearch;
  issueList: Issue[];
  sortAscending : boolean = true;
  issueRequestParam = new IssueListRequestParam;
  mapOptions: MapOptions;
  mapMarkers : Marker[] = [];

  @ViewChild(MatPaginator) paginator : MatPaginator;


  constructor(private issueService: IssueService, private router : Router) {
    this.mapOptions = {
      layers: [
        tileLayer(
          'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          { maxZoom: 18 }
        )
      ],
      zoom: 13,
      center: latLng(46.778186, 6.641524)
    };
   }

  ngOnInit(): void {
    this.issueRequestParam.pagination = new PaginationStructure;
    this.issueRequestParam.pagination.page = 1;
    this.issueRequestParam.pagination.pageSize = 5;
    this.issueService.loadAllIssues(this.issueRequestParam).subscribe({
      next: (result) => {this.issueList = result.body;
                          this.issueRequestParam.pagination.length = parseInt(result.headers.get("pagination-total"));
                          this.createMarkerList();
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
                          this.createMarkerList();
                        },
      error: (error) => console.log("Erreur", error)
    })

  }

  jumpToIssueCreation(){
    this.router.navigate([`/Accueil/issues/new`]);
  }

  jumpToIssueEdition(issue : Issue){
    this.router.navigate([`/Accueil/issues/${issue.id}`]);;
  }

  createMarkerList(){
    this.mapMarkers = [];
    this.issueList.forEach(issue => {
      let latitude : number = issue.location.coordinates[1];
      let longitude : number = issue.location.coordinates[0];
      let marker = new Marker([latitude,longitude]);

      this.mapMarkers.push(marker);
    });
  }
}
