import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NgxPayPalModule } from 'ngx-paypal';
import { FileUploadModule } from 'ng2-file-upload';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ServicesComponent } from './services/services.component';
import { ContactComponent } from './otherPage/contact/contact.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { RouterModule,Routes } from '@angular/router';
import { AboutComponent } from './otherPage/about/about.component';
import { UserService } from './service/User.service';
import { AgencyService } from './service/agency.service';
import { AuthGuardService } from './service/auth-guard.service';
import { ReserveTicketService } from './service/reserve-ticket.service';
import { ContactService } from './service/contact.service'
import { CreateVoitureComponent } from './otherPage/create-voiture/create-voiture.component';
import { CovoitureService } from './service/covoiture.service';
import { SingleProfilComponent } from './otherPage/single-profil/single-profil.component';
import { SingleAgencyComponent } from './otherPage/single-agency/single-agency.component';
import { ReserveTicketComponent } from './otherPage/reserve-ticket/reserve-ticket.component';
import { ProfilUsersComponent } from './otherPage/profil-users/profil-users.component';
import { from } from 'rxjs';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'services', canActivate: [AuthGuardService], component: ServicesComponent},
  {path: 'contact', canActivate: [AuthGuardService], component: ContactComponent},
  {path: 'about', component:AboutComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'carpooling',canActivate: [AuthGuardService], component: CreateVoitureComponent},
  {path: 'carpooler/:id',canActivate: [AuthGuardService], component: SingleProfilComponent},
  {path: 'agencyProfil/:code',canActivate: [AuthGuardService], component: SingleAgencyComponent},
  {path: 'ReserveTicket/:id', canActivate: [AuthGuardService], component : ReserveTicketComponent},
  {path: 'UserProfil/:username', canActivate : [AuthGuardService], component : ProfilUsersComponent},
  {path: '**', redirectTo: 'home'}
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ServicesComponent,
    ContactComponent,
    LoginComponent,
    RegisterComponent,
    AboutComponent,
    CreateVoitureComponent,
    SingleProfilComponent,
    SingleAgencyComponent,
    ReserveTicketComponent,
    ProfilUsersComponent,
  ],
  imports: [
    BrowserModule,
    FileUploadModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPayPalModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [UserService,
              CovoitureService,
              AgencyService,
              AuthGuardService,
              ReserveTicketService,
              ContactService],
  bootstrap: [AppComponent]
})
export class AppModule { }
