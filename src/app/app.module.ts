import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './Components/landing-page/landing-page.component';
import { CallbackComponent } from './Components/Callback/callback.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ShareComponent } from './Components/share/share.component';


@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    CallbackComponent,
    DashboardComponent,
    ShareComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
