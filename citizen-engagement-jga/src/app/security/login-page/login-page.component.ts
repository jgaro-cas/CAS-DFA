import { Component, OnInit } from "@angular/core";
import { AuthRequest } from "src/app/models/auth-request";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { User } from 'src/app/models/user';
import { UsersManagementService } from 'src/app/api/services/users-management.service';
import { ConstantPool } from '@angular/compiler';

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.scss"],
})
export class LoginPageComponent {
  /**
   * This authentication request object will be updated when the user
   * edits the login form. It will then be sent to the API.
   */
  authRequest: AuthRequest;

  /**
   * If true, it means that the authentication API has return a failed response
   * (probably because the name or password is incorrect).
   */
  loginError: boolean;
  signInMode: boolean = false;
  newUser = new User;

  constructor(private auth: AuthService, private router: Router, private userService : UsersManagementService) {
    this.authRequest = new AuthRequest();
    this.loginError = false;
  }

  /**
   * Called when the login form is submitted.
   */
  onSubmit(form: NgForm) {
    // Only do something if the form is valid
    if (form.valid) {
      // Hide any previous login error.
      this.loginError = false;

      // Perform the authentication request to the API.
      this.auth.login(this.authRequest).subscribe({
        next: (result) => {this.router.navigateByUrl("/Accueil");
                            console.log(result);
                          },
        error: (err) => {
          this.loginError = true;
          console.warn(`Authentication failed: ${err.message}`);
        },
      });
    }
  }

  changeSignInMode(){
    this.signInMode = !this.signInMode;
    if(this.signInMode){
      this.authRequest.name = "";
      this.authRequest.password = "";
    } else{
      this.newUser.name = "";
      this.newUser.firstname = "";
      this.newUser.lastname = "";
      this.newUser.password = "";
      this.newUser.phone = "";
    }
  }

  onSigninSubmit(form: NgForm){
    if(form.valid){
      this.newUser.roles = ["citizen"];
      this.userService.createUser(this.newUser).subscribe({
        next: () => this.changeSignInMode(),
        error: (error) => console.log("Erreur", error)
      });
    }
  }

}