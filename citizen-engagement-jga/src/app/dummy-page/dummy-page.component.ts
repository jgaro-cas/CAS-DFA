import { Component, OnInit } from '@angular/core';
import { IssueTypeService } from '../api/services/issue-type.service';
import { UsersManagementService } from '../api/services/users-management.service';
import { User } from '../models/user';
import { MeService } from '../api/services/me.service';
import { IssueListRequestParam } from '../models/issue-list-request-param';
import { IssueType } from '../models/issue-type';
import { IssueService } from '../api/services/issue.service';
import { Issue } from '../models/issue';
import { PaginationStructure } from '../models/pagination-structure';

@Component({
  selector: 'app-dummy-page',
  templateUrl: './dummy-page.component.html',
  styleUrls: ['./dummy-page.component.scss']
})
export class DummyPageComponent implements OnInit {

  private testNewUser : User;
  private testUpdatedUser : User;
  private testUserId  : string;
  testPagination = new PaginationStructure;

  constructor(private issueTypeService: IssueTypeService, 
              private userManagementService : UsersManagementService,
              private meService : MeService,
              private issueService : IssueService) { }

  ngOnInit(): void {
    this.testPagination.page = 1;
    this.testPagination.pageSize = 50;
  }

  testGetUserList(){
    console.log(this.testPagination);
    this.testPagination.sortUser = "-name";

    this.userManagementService.loadAllUsers(this.testPagination).subscribe({
      next: (result) => console.log("Users", result),
      error: (error) => console.warn("Error", error),
    });  
  }

  testCreateUser(){

    this.testNewUser = {
      name : "test2",
      firstname : "Firstname",
      lastname : "Lastname",
      password : "1234",
      phone : "+41 79 740 11 43",
      roles : ["citizen", "staff"],
      href : null,
      id : null
    }

    this.userManagementService.createUser(this.testNewUser).subscribe({
      next: (result) => console.log("New user", result),
      error: (error) => console.warn("Error", error),
    });
  }

  loadSingleUser(){
    this.testUserId = '5f2b1a1e240e240016e8898c';

    this.userManagementService.loadSingleUser(this.testUserId).subscribe({
      next: (result) => console.log("User details", result),
      error: (error) => console.log("Error", error),
    });
  }

  updateUser(){
    this.testUpdatedUser = {
      name : "test2",
      firstname : "FirstName",
      lastname : "LastName",
      password : "1234",
      phone : "+41 79 740 11 43",
      roles : ["citizen", "staff"],
      href : null,
      id : null
    }

    this.testUserId = '5f2b1a1e240e240016e8898c';

    this.userManagementService.updateUser(this.testUserId, this.testUpdatedUser).subscribe({
      next: (result) => console.log("Updated User", result),
      error: (error) => console.log("Error", error),
    });
  }
  
  loadMyInformations(){
    this.meService.loadMyInformations().subscribe({
      next: (result) => console.log("My informations", result),
      error: (error) => console.log("Error", error),
    });
  }

  loadMyIssues(){
    let testParams = new IssueListRequestParam();
    testParams.pagination = this.testPagination;
    this.meService.loadMyIssues(testParams).subscribe({
      next: (result) => console.log("My issues", result),
      error: (error) => console.log("Error", error),
    });
  }

  loadIssueTypes(){
    this.issueTypeService.loadAllIssueTypes(this.testPagination).subscribe({
      next: (result) => console.log("Issue types", result),
      error: (error) => console.warn("Error", error),
    });
  }

  createIssueType(){
    const testIssueType = new IssueType;
    testIssueType.name = "Issue-type-2";
    testIssueType.description = "Deuxième issue type test";
    testIssueType.icon = "http://URL-icone.png";
    testIssueType.imageUrl = "http://URL-Image.png";

    this.issueTypeService.createIssueType(testIssueType).subscribe({
      next: (result) => console.log("New issue type", result),
      error: (error) => console.warn("Error", error),
    });
  }

  loadSingleIssueType(){
    const id = "5f395cdf00ff2f00168d6425";

    this.issueTypeService.loadSingleIssueType(id).subscribe({
      next: (result) => console.log("Single issue type", result),
      error: (error) => console.warn("Error", error),
    });
  }

  updateIssueType(){
    const id = "5f3910b17cb73c001624ad5a";
    const testIssueType = new IssueType;
    testIssueType.name = "issue-test-2-modified";
    testIssueType.description = "Deuxième issue test modifiée";
    testIssueType.icon = "http://URL-icone.png";
    testIssueType.imageUrl = "http://URL-Image.png";

    this.issueTypeService.UpdateIssueType(testIssueType, id).subscribe({
      next: (result) => console.log("Issue updated", result),
      error: (error) => console.warn("Error", error),
    });
  }

  deleteIssueType(){
    const id = "5f391b1b7cb73c001624ad5b";

    this.issueTypeService.deleteIssueType(id).subscribe({
      next: (result) => console.log("Issue deleted", result),
      error: (error) => console.warn("Error", error),
    });
  }

  loadAllIssues(){
    const params = new IssueListRequestParam();
    params.pagination = this.testPagination;
    
    this.issueService.loadAllIssues(params).subscribe({
      next: (result) => console.log("Issue list", result),
      error: (error) => console.warn("Error", error),
    });
  }

  createNewIssue(){
    let geoJsonLocation = { "coordinates" : [46.913757, 6.968630],
                            "type" : "Point"
                          }; 
    

    let issue = new Issue();
    issue.description = "Première issue crée";
    issue.issueTypeHref = "/api/issueTypes/5f395cdf00ff2f00168d6425";
    issue.location = geoJsonLocation;
    issue.tags = ["#MaPremièreIssue", "#CestUnTest"];


    this.issueService.createNewIssue(issue).subscribe({
      next: (result) => console.log("New issue", result),
      error: (error) => console.warn("Error", error),
    });
  }

  loadSpecificIssue(){
    let id = "5f3969d24884d70016a5a2fc";

    this.issueService.loadSpecificIssue(id).subscribe({
      next: (result) => console.log("Issue :", result),
      error: (error) => console.log("Error", error)
    });
  }
}
