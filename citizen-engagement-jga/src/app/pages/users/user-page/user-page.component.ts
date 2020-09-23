import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { faPen } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  receivedUser : User;
  faPen = faPen;
  editMode : boolean = false;
  editButtonText : string = "Modifier";
  editButtonColor : string = "primary";

  constructor() { }

  ngOnInit(): void { 
    console.log(history.state);
    this.receivedUser = history.state['user'];
    console.log('User : ', this.receivedUser);
   }

  displayUser(){
    console.log("User :", this.receivedUser);
  }

  getUserFirstLastName(){
    return `${this.receivedUser.firstname} ${this.receivedUser.lastname}`;
  }


  onSubmit(datas : NgForm){
    ;
  }

  setEditMode(){
    this.editMode = !this.editMode;
    this.editMode ? this.editButtonText = "Annuler" : this.editButtonText = "Modifier";
    this.editMode ? this.editButtonColor = "warn" : this.editButtonColor = "primary";
  }

}
