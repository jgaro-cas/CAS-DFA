import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { UsersManagementService } from 'src/app/api/services/users-management.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  user = new User;
  receivedId : string;
  faPen = faPen;
  editMode : boolean = false;
  editButtonText : string = "Modifier";
  editButtonColor : string = "primary";
  roleCitizen : boolean = false;
  roleStaff : boolean = false;

  // fields
  inputFName;

  constructor(private userManagement : UsersManagementService, private route : ActivatedRoute, private router : Router) {
      this.route.paramMap.subscribe(
        param => this.receivedId = param.get('id'));
      
      // Temporary for checkBox initialisation
      this.user.roles=["citizen"];
   }

  ngOnInit(): void {
    this.userManagement.loadSingleUser(this.receivedId).subscribe({
      next : (result) => this.user = result,
      error : (error) => {console.log("Error", error);
                          this.router.navigate(['/Accueil/users']);}
    })
   }

  displayUser(){
    console.log("User :", this.user);
  }

  getUserFirstLastName(){
    return `${this.user.firstname} ${this.user.lastname}`;
  }

  onSubmit(datas : NgForm){
    console.log("Submitted", datas);
  }

  getRoleStaff(){
    if (this.user.roles !== undefined) {
      return this.user.roles.indexOf("staff") > -1 ? true : false;
    } else {
      return false;
    }
  }

  getRoleCitizen(){
    return this.user.roles.indexOf("citizen") > -1 ? true : false;
  }


  setEditMode(){
    this.editMode = !this.editMode;
    this.editMode ? this.editButtonText = "Annuler" : this.editButtonText = "Modifier";
    this.editMode ? this.editButtonColor = "warn" : this.editButtonColor = "primary";
  }



}
