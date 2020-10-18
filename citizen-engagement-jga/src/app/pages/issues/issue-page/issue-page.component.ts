import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { ActivatedRoute, Router} from '@angular/router';
import { IssueTypeService } from 'src/app/api/services/issue-type.service';
import { IssueService } from 'src/app/api/services/issue.service';
import { UsersManagementService } from 'src/app/api/services/users-management.service';
import { ActionStructure } from 'src/app/models/action-structure';
import { CommentsRequest } from 'src/app/models/comments-request';
import { Issue } from 'src/app/models/issue';
import { IssueListRequestParam } from 'src/app/models/issue-list-request-param';
import { IssueComment } from "src/app/models/issue-comment";
import { PaginationStructure } from 'src/app/models/pagination-structure';
import { CommentStructure } from 'src/app/models/comment-structure';
import { AuthService } from 'src/app/security/auth.service';

@Component({
  selector: 'app-issue-page',
  templateUrl: './issue-page.component.html',
  styleUrls: ['./issue-page.component.scss']
})
export class IssuePageComponent implements OnInit {

  issue = new Issue;
  receivedId : string;
  newIssueEdition : boolean = false;
  editMode : boolean = false;
  editButtonText : string = "Modifier";
  editButtonColor : string = "primary";
  issueRequestComplement = new IssueListRequestParam;
  commentRequestComplement = new CommentsRequest;
  assigneeId: string;
  assigneeName: string;
  assigneeUrl: string;
  creatorId : string;
  creatorName: string;
  creatorUrl: string;
  issueTypeId: string;
  issueTypeName: string;
  issueTypeUrl: string;
  issueAction = new ActionStructure;
  tagChain: string; 
  commentMode: boolean = false;
  commentButtonText: string = "Commenter";
  commentButtonColor: string = "primary";
  commentList: IssueComment[];
  newComment = new CommentStructure;

  constructor(private issueService : IssueService, private route: ActivatedRoute, 
              private router: Router, private userManagement: UsersManagementService,
              private issueTypeService : IssueTypeService,
              public auth : AuthService) { 

    this.route.paramMap.subscribe(
      param => this.receivedId = param.get('id'));

  }

  ngOnInit(): void {
    if (this.receivedId !== "new"){
      this.issueRequestComplement.include = ["actions", "assignee", "creator", "issueType"];
      this.commentRequestComplement.include = ["author"];
      this.commentRequestComplement.pagination = new PaginationStructure;
      this.commentRequestComplement.pagination.page = 1;
      this.commentRequestComplement.pagination.pageSize = 50;
      this.loadIssue();
      this.loadComments();
    }
  }

  onSubmit(datas : NgForm){
    
    if(this.newIssueEdition === true){

    }else{
      this.addTags(this.tagChain);
      this.issueService.updateIssue(this.issue.id, this.issue).subscribe({
        next: () => this.router.navigate(['/Accueil/issues']),
        error : (error) => console.log("Error", error)
      });
    }
  }

  loadIssue(){
    this.issueService.loadSpecificIssue(this.receivedId, this.issueRequestComplement.include).subscribe({
      next: (result) => {this.issue = result;
                          this.extractIssueIncludes(result);
                          console.log(result);
      },
      error: () => this.router.navigate(['/Accueil/issues'])
    });

  }

  loadComments(){
    this.issueService.loadIssueComment(this.receivedId, this.commentRequestComplement).subscribe({
      next: (result) => {this.commentList = result;
                          console.log("Commentlist", this.commentList);},
      error: (error) => console.log("Erreur", error)
    });
  }


  // Do not work automaticaly.... need to be fixed
  extractIssueIncludes(rawData){
    if(rawData.assigneeHref !== undefined && rawData.assigneeHref !== ""){
      this.assigneeId = rawData.assigneeHref.toString().split('/api/users/')[1];
      this.assigneeUrl = "users";
      this.userManagement.loadSingleUser(this.assigneeId).subscribe({
        next: (result) => this.assigneeName = result.name,
        error: (error) => console.log("Erreur", error)
      })
    }

    if(rawData.creatorHref !== undefined && rawData.creatorHref !== ""){
      this.creatorId = rawData.creatorHref.toString().split('/api/users/')[1];
      this.creatorUrl = "users";
      this.userManagement.loadSingleUser(this.creatorId).subscribe({
        next: (result) => this.creatorName = result.name,
        error: (error) => console.log("Erreur", error)
      })
    }

    if(rawData.issueTypeHref !== undefined && rawData.issueTypeHref !== ""){
      this.issueTypeId = rawData.issueTypeHref.toString().split('/api/issueTypes/')[1];
      this.issueTypeUrl = "issueTypes";
      this.issueTypeService.loadSingleIssueType(this.issueTypeId).subscribe({
        next: (result) => this.issueTypeName = result.name,
        error: (error) => console.log("Erreur", error)
      })
    }
  }

  getDate(date){
    let stringDate = new Date(date);
    return date !== "" ? stringDate.toLocaleDateString() + " à " + stringDate.toLocaleTimeString() : "";
  }

  applyAction(){
    console.log(this.issueAction);
    this.issueService.createIssueAction(this.issue.id, this.issueAction).subscribe({
      next: () => this.loadIssue(),
      error: (error) => console.log("Erreur", error)
    });
  }

  setEditMode(){
    this.editMode = !this.editMode;
    this.editMode ? this.editButtonText = "Annuler" : this.editButtonText = "Modifier";
    this.editMode ? this.editButtonColor = "warn" : this.editButtonColor = "primary";
  }

  setCommentMode(){
    this.commentMode = !this.commentMode;
    this.commentMode ? this.commentButtonText = "Annuler" : this.commentButtonText = "Commenter";
    this.commentMode ? this.commentButtonColor = "warn" : this.commentButtonColor = "primary";
    this.newComment.text = "";
  }

  addTags(tags : string){
    let taglist : string[] = tags.split(' ');
    taglist.forEach(tag => {
      this.issue.tags.push(tag);
    });
  }

  addNewCommentToList(comments : IssueComment[]){
    let commentTemp : IssueComment;
    console.log("Comment : ", comments);
    comments.forEach(comment => {
      commentTemp = comment;
    });
  }

  onCommentSubmit(datas : NgForm){
    console.log(datas);
    console.log("Texte :", this.newComment);
    this.issueService.createIssueComment(this.issue.id, this.newComment).subscribe({
      next: () => {this.loadComments();
                  this.setCommentMode();},
      error: (error) => console.log("Erreur", error)
    })
  }

}
