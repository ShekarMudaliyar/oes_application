import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { HttpClientModule } from "@angular/common/http";
import { SafePipe } from "./pipe";
import { TimerComponent } from './timer/timer.component';
import { EndpageComponent } from './endpage/endpage.component';
@NgModule({
  declarations: [AppComponent, HomeComponent, LoginComponent, SafePipe, TimerComponent, EndpageComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
