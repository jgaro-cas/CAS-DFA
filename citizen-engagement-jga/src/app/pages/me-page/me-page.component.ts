import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { MeService } from 'src/app/api/services/me.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-me-page',
  templateUrl: './me-page.component.html',
  styleUrls: ['./me-page.component.scss']
 
})
export class MePageComponent implements OnInit {

  user = new User();

  editMode : boolean = false;
  editButtonText : string = "Modifier";
  editButtonColor : string = "primary";
  roleCitizen : boolean = false;
  roleStaff : boolean = false;

  constructor(private meService : MeService) { 

   }

  ngOnInit(): void {
    this.meService.loadMyInformations().subscribe({
      next: (result) => { this.user = result;
                          this.user.roles.indexOf("citizen") > -1 ? this.roleCitizen = true : this.roleCitizen = false;
                          this.user.roles.indexOf("staff") > -1 ? this.roleStaff = true : this.roleStaff = false;},
      error: (error) => console.log("Erreur lors du chargement", error) 
    });
  }

  setEditMode(){
    this.editMode = !this.editMode;
    this.editMode ? this.editButtonText = "Annuler" : this.editButtonText = "Modifier";
    this.editMode ? this.editButtonColor = "warn" : this.editButtonColor = "primary";
  }

  onSubmit(meDatas : NgForm){
  }
}
