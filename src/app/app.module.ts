import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import {RouterModule, Routes} from '@angular/router';


import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';

import {ValidateService} from './services/validate.service';
import {AuthService} from './services/auth.service';
import {AlarmService} from './services/alarm.service';


import {FlashMessagesModule} from 'angular2-flash-messages';

const appRoutes: Routes = [
  {path:'', component: RegisterComponent},
  {path:'home', component: HomeComponent},

]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule
  ],
  providers: [ValidateService, AuthService, AlarmService],
  bootstrap: [AppComponent]
})
export class AppModule { }
