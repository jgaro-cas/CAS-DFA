import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { UsersManagementService } from 'src/app/api/services/users-management.service';
import { AuthService } from 'src/app/security/auth.service';

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
  newUserEdition : boolean = false;

  checkCitizen : boolean;
  checkStaff : boolean;

  constructor(private userManagement : UsersManagementService, private route : ActivatedRoute, private router : Router, public auth : AuthService) {
      this.route.paramMap.subscribe(
        param => this.receivedId = param.get('id'));
      
      // Temporary for checkBox initialisation
      this.user.roles=["citizen"];
   }

  ngOnInit(): void {
    if (this.receivedId !== "new"){
      this.userManagement.loadSingleUser(this.receivedId).subscribe({
        next : (result) => {this.user = result;
                            this.user.password = null;
                            this.checkStaff = result.roles.indexOf("staff") > -1;
                            this.checkCitizen = result.roles.indexOf("citizen") > -1;},
        error : (error) => this.router.navigate(['/Accueil/users'])
      })
    } else {
      this.newUserEdition = true;
      this.editMode = true;
    }
  }

  getUserFirstLastName(){
    return this.newUserEdition ? `${this.user.firstname} ${this.user.lastname}` : `Nouvel utilisateur`;
  }

  onSubmit(datas : NgForm){
    Object.assign(this.user, datas.value);
    if (this.newUserEdition === true){
      if (this.checkCitizen === true){
        this.user.roles.push("citizen");
      } else {
        this.user.roles.slice(this.user.roles.indexOf("citizen"));
      }
      if (this.checkStaff === true){
        this.user.roles.push("staff");
      } else {
        this.user.roles.slice(this.user.roles.indexOf("staff"));
      }
      this.userManagement.createUser(this.user).subscribe({
        next: () => this.router.navigate(['/Accueil/users']),
        error : (error) => console.log("Error", error)
      });
    } else {
      this.user.password = this.user.password === null ? undefined : this.user.password;
      this.user.roles.splice(0, this.user.roles.length);
      if (this.checkCitizen === true){
        this.user.roles.push("citizen");
      } else {
        this.user.roles.slice(this.user.roles.indexOf("citizen"), this.user.roles.indexOf("citizen") + 1);
      }
      if (this.checkStaff === true){
        this.user.roles.push("staff");
      } else {
        this.user.roles.slice(this.user.roles.indexOf("staff"));
      }

      this.userManagement.updateUser(this.user.id, this.user).subscribe({
        next: () => this.router.navigate(['/Accueil/users']),
        error : (error) => console.log("Error", error)
      });
    }
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
