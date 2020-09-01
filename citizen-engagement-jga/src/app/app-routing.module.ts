import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './security/login-page/login-page.component';
import { DummyPageComponent } from './dummy-page/dummy-page.component';
import { AuthGuard } from './security/guards/auth.guard';
import { PageAccueilComponent } from './pages/page-accueil/page-accueil.component';


const routes: Routes = [
  {path: "", redirectTo: "Accueil", pathMatch: "full"},
  {path: "login", component: LoginPageComponent},
  {path: "Accueil", component: PageAccueilComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
