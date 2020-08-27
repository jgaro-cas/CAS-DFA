import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { DummyPageComponent } from './dummy-page/dummy-page.component';
import { FormsModule } from '@angular/forms';
import { SecurityModule } from './security/security.module';
import { ApiTokenInterceptorService } from './api/api-token-interceptor.service';
import { PageAccueilComponent } from './pages/page-accueil/page-accueil.component';

@NgModule({
  declarations: [
    AppComponent,
    DummyPageComponent,
    PageAccueilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    SecurityModule
  ],
  providers: [{provide : HTTP_INTERCEPTORS,
                useClass : ApiTokenInterceptorService,
                multi : true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
