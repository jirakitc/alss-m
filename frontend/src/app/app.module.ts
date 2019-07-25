import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddUserComponent } from './comp/add-user/add-user.component';
import { UserComponent } from './comp/user/user.component';
import { UserDetailsComponent } from './comp/user-details/user-details.component';
import { RegisterComponent } from './comp/register/register.component';
import { HomeComponent } from './comp/home/home.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { EditComponent } from './comp/edit/edit.component';
import { LoginComponent } from './comp/login/login.component';
import { ProfileComponent } from './comp/profile/profile.component';
import { ChatComponent } from './comp/chat/chat.component';
import { AddClassComponent } from './comp/add-class/add-class.component';
import { EnrollComponent } from './comp/enroll/enroll.component';
import { AddSubjectComponent } from './comp/add-subject/add-subject.component';
import { EnrollclassComponent } from './comp/enrollclass/enrollclass.component';

@NgModule({
  declarations: [
    AppComponent,
    AddUserComponent,
    UserComponent,
    UserDetailsComponent,
    RegisterComponent,
    HomeComponent,
    NavbarComponent,
    EditComponent,
    LoginComponent,
    ProfileComponent,
    ChatComponent,
    AddClassComponent,
    EnrollComponent,
    AddSubjectComponent,
    EnrollclassComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
